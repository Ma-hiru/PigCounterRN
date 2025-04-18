package com.zlz.pigcounter.service.impl;

import com.common.constant.JwtClaimsConstant;
import com.common.context.BaseContext;
import com.common.exception.*;
import com.common.pojo.entity.Employee;
import com.common.pojo.entity.ProfilePicture;
import com.common.pojo.vo.EmployeeVO;
import com.common.result.PageResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zlz.pigcounter.mapper.EmployeeMapper;
import com.common.pojo.dto.EmployeeLoginDTO;
import com.zlz.pigcounter.mapper.ProfilePictureHistoryMapper;
import com.common.properties.JwtProperties;
import com.zlz.pigcounter.service.EmployeeService;
import com.zlz.pigcounter.utils.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private ProfilePictureHistoryMapper profilePictureHistoryMapper;

    @Autowired
    private Pbkdf2PasswordEncoder passwordEncoder;

    @Autowired
    JwtProperties jwtProperties;

    @Value("${zlz.image.save-path}")
    private String imageSavePath;

    @Override
    public EmployeeVO login(EmployeeLoginDTO employeeLoginDTO) {

        String username = employeeLoginDTO.getUsername();
        String password = employeeLoginDTO.getPassword();

        log.info("用户名：{}，密码：{}", username, password);

        Employee employee = employeeMapper.getByUsername(username);
        if(employee==null){
            throw new NotFoundUserException();
        }



        if(!passwordEncoder.matches(password,employee.getPassword())){
            throw new PasswordError();
        }
        HashMap<String,Object> map = new HashMap<>();
        map.put(JwtClaimsConstant.EMP_ID,employee.getId());

        String token = JwtUtil.createJWT(jwtProperties.getAdminSecretKey(), jwtProperties.getAdminTtl(), map);

        EmployeeVO employeeVo = EmployeeVO.builder().id(employee.getId())
                .name(employee.getName())
                .username(employee.getUsername())
                .token(token)
                .profilePicture(employee.getProfilePicture())
                .organization(employee.getOrganization())
                .admin(employee.getAdmin())
                .build();


        return employeeVo;
    }


    @Override
    @Transactional
    public void add( Employee employee, MultipartFile profilePicture)  {
        //确保只有管理员账号能创建管理员账号
        Long currentId = BaseContext.getCurrentId();
        if(employee.getAdmin()) {
            if (currentId == null || !employeeMapper.getById(currentId).getAdmin()) {
                throw new UnauthorizedModificationException("只有管理员能创建管理员账号");
            }
        }

        if(employeeMapper.getByUsername(employee.getUsername())!=null){
            throw new UserAlreadyExistsException();
        }
        String filePath="";
        String  password = passwordEncoder.encode(employee.getPassword());
        employee.setPassword(password);
        if(profilePicture !=null&&!profilePicture.isEmpty()){
            // 检查文件类型
            if (!isValidImageFile(profilePicture)) {
                throw new ProfilePictureUploadException("上传的文件不是有效的图片文件");
            }
            String fileExtension=profilePicture.getOriginalFilename().substring(profilePicture.getOriginalFilename().lastIndexOf("."));
            String fileName= UUID.randomUUID() +fileExtension;
             filePath= imageSavePath+"/"+fileName;
        }
        employee.setProfilePicture(filePath);
        employee.setCreateTime(LocalDateTime.now());
        employeeMapper.insert(employee);

        ProfilePicture profilePictureHistory = ProfilePicture.builder()
                .employeeId(employee.getId())
                .profilePicture(filePath)
                .isCurrent(true)
                .uploadTime(LocalDateTime.now())
                .build();
        profilePictureHistoryMapper.insert(profilePictureHistory);
        try {
            uploadProfilePicture(profilePicture,filePath);
        } catch (IOException e) {
            throw new ProfilePictureUploadException("头像文件上传失败",e);
        }


    }



    @Override
    @Transactional
    public void update(Employee employee, MultipartFile profilePicture)  {
        //只有自己或者管理员能修改员工信息
        Long currentId = BaseContext.getCurrentId();
        if(!currentId.equals(employee.getId())&&!employeeMapper.getById(currentId).getAdmin()){
           throw new UnauthorizedModificationException();
        }
        String filePath="";
        String  password = passwordEncoder.encode(employee.getPassword());
        employee.setPassword(password);
        if(profilePicture !=null&&!profilePicture.isEmpty()){
            // 检查文件类型
            if (!isValidImageFile(profilePicture)) {
                throw new ProfilePictureUploadException("上传的文件不是有效的图片文件");
            }
            String fileExtension=profilePicture.getOriginalFilename().substring(profilePicture.getOriginalFilename().lastIndexOf("."));
            String fileName= UUID.randomUUID() +fileExtension;
            filePath= imageSavePath+"/"+fileName;
        }
        employee.setProfilePicture(filePath);
        ProfilePicture profilePictureHistory = ProfilePicture.builder()
                .employeeId(employee.getId())
                .profilePicture(filePath)
                .isCurrent(true)
                .uploadTime(LocalDateTime.now())
                .build();

        profilePictureHistoryMapper.updateIsCurrent(employeeMapper.getProfilePictureById(employee.getId()),false);

        employeeMapper.update(employee);

        profilePictureHistoryMapper.insert(profilePictureHistory);


        try {
            uploadProfilePicture( profilePicture,filePath);
        } catch (IOException e) {
            throw new ProfilePictureUploadException("头像文件上传失败",e);
        }

    }

    @Override
    public Employee getById(Long id) {
        Employee employee = employeeMapper.getById(id);
        if(employee==null){
            throw new NotFoundUserException();
        }
        return employee;
    }

    @Override
    public void deleteById(Long id) {
        //只有管理员和自己能删除自己的账号
        if(!BaseContext.getCurrentId().equals(id)&&!employeeMapper.getById(BaseContext.getCurrentId()).getAdmin()){
            throw new UnauthorizedModificationException();
        }
        deleteProfilePicture(id);
        employeeMapper.deleteById(id);

    }



    @Override
    public PageResult page(int pageNum, int pageSize, String organization) {
        PageHelper.startPage(pageNum,pageSize);
        Page<Employee> page  = employeeMapper.page(organization);
        if(page==null){
            throw new NotFoundUserException();
        }
        return new PageResult(page.getTotal(),page.getResult());
    }

    @Override
    @Transactional
    public void deleteByIds(Long[] ids) {
        Long curentId = BaseContext.getCurrentId();
        if(!employeeMapper.getById(curentId).getAdmin()){
            throw new UnauthorizedModificationException();
        }

        for (Long id : ids) {
            deleteProfilePicture(id);
        }
        profilePictureHistoryMapper.deleteByEmployeeIds(ids);
        employeeMapper.deleteBatch(ids);
    }

    private void uploadProfilePicture( MultipartFile profilePicture,String filePath) throws IOException {


            File Dir= new File(imageSavePath);
            if(!Dir.exists()){
                Dir.mkdirs();
            }
            try (InputStream inputStream = profilePicture.getInputStream();
                 FileOutputStream outputStream = new FileOutputStream(filePath)) {
                byte[] buffer = new byte[1024];
                int bytes;
                while ((bytes = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytes);
                }
            }

    }
    private boolean isValidImageFile(MultipartFile file) {
        // 检查 MIME 类型
        String contentType = file.getContentType();
        if (contentType != null && contentType.startsWith("image")) {
            return true;
        }

        // 检查文件扩展名
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null) {
            String fileExtension = originalFilename.toLowerCase();
            return fileExtension.endsWith(".jpg") || fileExtension.endsWith(".jpeg") ||
                    fileExtension.endsWith(".png") || fileExtension.endsWith(".gif") ||
                    fileExtension.endsWith(".bmp") || fileExtension.endsWith(".tiff");
        }

        return false;
    }
    private void deleteProfilePicture(Long id) {
        String employeeProfilePicture = employeeMapper.getProfilePictureById(id);
        if (employeeProfilePicture == null) {
            throw new NotFoundUserException();
        }
        List<String> profilePictures = profilePictureHistoryMapper.getByEmployeeId(id);
        for (String profilePicture : profilePictures) {
            File file = new File(profilePicture);
            if (file.exists()) {
                if(!file.delete()){
                    throw new ProfilePictureDeleteException();
                };
            }
            profilePictureHistoryMapper.deleteByProfilePicture(profilePicture);
        }
    }
}
