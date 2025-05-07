package com.zlz.pigcounter.service.impl;

import com.common.exception.NotFoundTaskException;
import com.common.pojo.dto.*;
import com.common.pojo.entity.PenPicture;
import com.common.pojo.entity.Task;
import com.common.pojo.vo.PenPictureVO;
import com.common.result.PageResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.common.collect.Lists;
import com.zlz.pigcounter.mapper.PenMapper;
import com.zlz.pigcounter.mapper.PenPictureMapper;
import com.zlz.pigcounter.mapper.TaskBuildingPenMapper;
import com.zlz.pigcounter.mapper.TaskMapper;
import com.zlz.pigcounter.service.TaskService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {
    @Value("${zlz.AI}")
    private String aiUrl;
    @Autowired
    private TaskMapper taskMapper;

    @Autowired
    private TaskBuildingPenMapper taskBuildingPenMapper;
    @Autowired
    private PenPictureMapper penPictureMapper;
    @Autowired
    private PenMapper penMapper;

    @Override
    @Transactional
    public void add(TaskDTO taskDTO) {
        //插入任务表
        Task task = new Task();
        BeanUtils.copyProperties(taskDTO,task);
        task.setValid(true);
        task.setOrgId(taskDTO.getOrgId());
        taskMapper.insert(task);
        //插入任务详情表
        taskDTO.setId(task.getId());
        int batchSize = 500;
        List<Map<String, Object>> paramsList = taskDTO.getBuildings().stream()
                .flatMap(building ->
                {
                    List<TaskPenDTO> pens = building.getPens();
                    if (pens.isEmpty()) {
                        // 如果 getPens() 为 空，则从数据库查询该楼栋下所有猪圈
                        pens = penMapper.getTaskPenDTOsByBuildingId(building.getBuildingId());
                    }
                    return pens.stream()
                            .map(pen -> {
                                Map<String, Object> map = new HashMap<>();
                                map.put("taskId", task.getId());
                                map.put("buildingId", building.getBuildingId());
                                map.put("penId", pen.getPenId());
                                return map;
                            });
                } )
                .collect(Collectors.toList());

        List<List<Map<String, Object>>> partitions = Lists.partition(paramsList, batchSize);

        partitions.forEach(partition -> {
            taskBuildingPenMapper.batchInsert(partition);
        });
    }

    @Override
    public PageResult getByEmployeeId(Long employeeId) {
        List<Task> tasks = taskMapper.getByEmployeeId(employeeId);
        if(tasks==null){
           throw new NotFoundTaskException();
        }
        return new PageResult(tasks.size(),tasks);
    }

    @Override
    public PageResult getTasksPage(int pageNum, int pageSize,Long orgId) {
        //TODO鉴权
        PageHelper.startPage(pageNum,pageSize);
        try(Page<Task> page =taskMapper.getTasksPage(orgId)) {
            if (page==null){
                throw  new  NotFoundTaskException();
            }
            return new PageResult(page.getTotal(),page.getResult());
        }
        
    }

    @Override
    public DetailTaskDTO getTaskDetail(Long taskId) {
        //TODO组织鉴权
        DetailTaskDTO taskDetail = taskBuildingPenMapper.getTaskDetail(taskId);

        if (taskDetail==null){
            throw new NotFoundTaskException();
        }
        return taskDetail;
    }

    @Override
    @Transactional
    public Mono<PenPictureVO> upload(PenPictureUploadDTO uploadDTO) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        Arrays.stream(uploadDTO.getFiles()).forEach(file ->
                builder.part("files", file.getResource()) // 仅添加文件参数
        );
        WebClient webClient = WebClient.create(aiUrl);

        Mono<List<PenPicture>> mono = webClient.post().uri("/predict")
                .contentType(MediaType.MULTIPART_FORM_DATA) // 必须设置
                .body(BodyInserters.fromMultipartData(builder.build()))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<PenPicture>>() {
                });
        return mono.flatMap(result -> {
            for (PenPicture penPicture : result) {
                penPicture.setTime(LocalDateTime.now());
                penPicture.setPenId(uploadDTO.getPenId());
                penPicture.setTaskId(uploadDTO.getTaskId());
            }
            //TODO删除本地文件(未实现)
            penPictureMapper.deletePicture(uploadDTO.getTaskId(), uploadDTO.getPenId());
           penPictureMapper.insertBatch(result);

            // 提取信息并构建 penPictureVO
            List<String> picturePaths = result.stream()
                    .map(PenPicture::getPicturePath)
                    .collect(Collectors.toList());

            List<String> outputPicturePaths = result.stream()
                    .map(PenPicture::getOutputPicturePath)
                    .collect(Collectors.toList());
            List<Integer> counts = result.stream()
                    .map(PenPicture::getCount)
                    .collect(Collectors.toList());
            PenPictureVO penPictureVO = PenPictureVO.builder()
                .picturePath(picturePaths)
                .outputPicturePath(outputPicturePaths)
                .taskId(uploadDTO.getTaskId())
                .count(counts)
                .build();
            return Mono.just(penPictureVO);
        });
    }

    @Override
    @Transactional
    public void deletePicture(Long taskId, Long penId) {
        DetailPenDTO picturePath = penPictureMapper.getPicturePath(taskId, penId);
        if (picturePath==null){
            throw new NotFoundTaskException();
        }
        Path picturePath1 = Paths.get(picturePath.getPicturePath());
        Path outputPicturePath = Paths.get(picturePath.getOutputPicturePath());
        try {
            Files.delete(picturePath1);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        try {
            Files.delete(outputPicturePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        penPictureMapper.deletePicture(taskId,penId);
    }

    @Override
    public void confirmPicture(ConfirmPenPictureDTO confirmPenPictureDTO) {
        //TODO  权限验证
        penPictureMapper.confirmPicture(confirmPenPictureDTO);
    }
}
