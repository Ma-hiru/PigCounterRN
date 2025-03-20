package com.zlz.pigcounter.service;

import Common.pojo.dto.EmployeeLoginDTO;
import Common.pojo.entity.Employee;
import Common.pojo.vo.EmployeeVO;
import Common.result.PageResult;
import org.springframework.web.multipart.MultipartFile;

public interface EmployeeService {
    EmployeeVO login(EmployeeLoginDTO employeeLoginDTO);

    void add(Employee employee, MultipartFile profilePicture) ;

    void update( Employee employee, MultipartFile profilePicture) ;

    Employee getById(Long id);

    void deleteById(Long id);

    PageResult page(int pageNum, int pageSize, String organization);

    void deleteByIds(Long[] ids);
}
