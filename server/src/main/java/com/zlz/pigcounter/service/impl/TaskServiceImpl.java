package com.zlz.pigcounter.service.impl;

import com.common.exception.NotFoundTaskException;
import com.common.pojo.dto.PenDTO;
import com.common.pojo.dto.PenPictureUploadDTO;
import com.common.pojo.dto.TaskDTO;
import com.common.pojo.entity.PenPicture;
import com.common.pojo.entity.Task;
import com.common.pojo.vo.PenPictureVO;
import com.common.result.PageResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
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
import java.util.List;
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

    @Override
    @Transactional
    public void add(TaskDTO taskDTO) {

        //插入任务表
        Task task = new Task();
        BeanUtils.copyProperties(taskDTO,task);
        task.setVaild(true);
        taskMapper.insert(task);
        //插入任务详情表
        taskDTO.setId(task.getId());
        taskBuildingPenMapper.insert(taskDTO);
    }

    @Override
    public PageResult getByEmployeeId(Long employeeid) {
        List<Task> tasks = taskMapper.getByEmployeeId(employeeid);
        if(tasks==null){
           throw new NotFoundTaskException();
        }
        return new PageResult(tasks.size(),tasks);
    }

    @Override
    public PageResult getTasksPage(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        Page<Task> page =taskMapper.getTasksPage();
        if (page==null){
            throw  new  NotFoundTaskException();
        }
        return new PageResult(page.getTotal(),page.getResult());
    }

    @Override
    public TaskDTO getTaskDetail(Long taskId) {

        TaskDTO taskDetail = taskBuildingPenMapper.getTaskDetail(taskId);

        if (taskDetail==null){
            throw new NotFoundTaskException();
        }
        return taskDetail;
    }

    @Override
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
    public void deletePicture(Long taskId, Long penId) {
        PenDTO picturePath = penPictureMapper.getPicturePath(taskId, penId);
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
}
