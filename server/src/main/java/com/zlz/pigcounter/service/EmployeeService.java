package com.zlz.pigcounter.service;

import Common.pojo.dto.EmployeeLoginDTO;
import Common.pojo.entity.Employee;
import Common.pojo.vo.EmployeeVO;

public interface EmployeeService {
    Employee login(EmployeeLoginDTO employeeLoginDTO);
}
