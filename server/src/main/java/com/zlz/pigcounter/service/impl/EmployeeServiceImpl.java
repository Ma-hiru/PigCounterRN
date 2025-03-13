package com.zlz.pigcounter.service.impl;

import Common.exception.NotFoundUserException;
import Common.pojo.entity.Employee;
import com.zlz.pigcounter.mapper.EmployeeMapper;
import Common.pojo.dto.EmployeeLoginDTO;
import Common.pojo.vo.EmployeeVO;
import com.zlz.pigcounter.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

@Service
@Slf4j
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeMapper employeeMapper;
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
}
