package com.zlz.pigcounter.service.impl;

import Common.exception.NotFoundUserException;
import Common.pojo.entity.Employee;
import com.zlz.pigcounter.mapper.EmployeeMapper;
import Common.pojo.dto.EmployeeLoginDTO;
import Common.pojo.vo.EmployeeVO;
import com.zlz.pigcounter.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
@Slf4j
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeMapper employeeMapper;
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

        password = DigestUtils.md5DigestAsHex(password.getBytes());

        if(!password.equals(employee.getPassword())){
            throw new NotFoundUserException();
        }

        return employee;
    }


    @Override
    public void add( Employee employee, MultipartFile profilePicture) throws IOException {
        String  password = DigestUtils.md5DigestAsHex(employee.getPassword().getBytes());
        employee.setPassword(password);
        if(profilePicture!=null&&!profilePicture.isEmpty()){

            File Dir= new File(imageSavePath);
            if(!Dir.exists()){
                Dir.mkdirs();
            }
            String fileName= profilePicture.getOriginalFilename();
            String filePath= imageSavePath+"/"+fileName;

            try (InputStream inputStream = profilePicture.getInputStream();
                 FileOutputStream outputStream = new FileOutputStream(filePath)) {
                byte[] buffer = new byte[1024];
                int bytes;
                while ((bytes = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytes);
                }
            }
            employee.setProfilePicture(filePath);
        }

        employeeMapper.insert(employee);
    }
}
