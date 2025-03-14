package com.zlz.pigcounter.service;

import Common.pojo.dto.EmployeeLoginDTO;
import Common.pojo.entity.Employee;
import Common.pojo.vo.EmployeeVO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface EmployeeService {
    Employee login(EmployeeLoginDTO employeeLoginDTO);

    void add(Employee employee, MultipartFile profilePicture) throws IOException;
}
