package com.zlz.pigcounter.service.impl;

import Common.context.BaseContext;
import Common.exception.NotFoundUserException;
import Common.exception.PasswordError;
import Common.exception.ProfilePictureUploadException;
import Common.exception.UnauthorizedModificationException;
import Common.pojo.entity.Employee;
import Common.pojo.entity.ProfilePicture;
import com.zlz.pigcounter.mapper.EmployeeMapper;
import Common.pojo.dto.EmployeeLoginDTO;
import Common.pojo.vo.EmployeeVO;
import com.zlz.pigcounter.mapper.ProfilePictureHistoryMapper;
import com.zlz.pigcounter.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.multipart.MultipartFile;

import java.awt.print.PrinterAbortException;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
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

    @Value("${zlz.image.save-path}")
    private String imageSavePath;
    @Override
    public Employee login(EmployeeLoginDTO employeeLoginDTO) {
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

        return employee;
    }


    @Override
    @Transactional
    public void add( Employee employee, MultipartFile profilePicture)  {
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
        Long currentId = BaseContext.getCurrentId();
        if(!currentId.equals(employee.getId())){
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

        profilePictureHistoryMapper.updateIsCurrent(employeeMapper.getById(employee.getId()).getProfilePicture(),false);

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
}
