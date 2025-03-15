package com.zlz.pigcounter.controller.admin;

import Common.constant.JwtClaimsConstant;
import Common.pojo.dto.EmployeeLoginDTO;
import Common.pojo.entity.Employee;
import Common.pojo.vo.EmployeeVO;
import Common.result.Result;
import Common.validation.EmployeeValidation;
import com.zlz.pigcounter.properties.JwtProperties;
import com.zlz.pigcounter.service.EmployeeService;
import com.zlz.pigcounter.utils.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;

@RestController
@Slf4j
@RequestMapping("/user")
public class EmployeeController {
    @Autowired
    @Qualifier("employeeServiceImpl")
    private EmployeeService employeeService;

    @Autowired
    private JwtProperties jwtProperties;

    /**
     * 员工登录
     * @param employeeLoginDTO
     * @return
     */
    @PostMapping("/login")
    public Result<EmployeeVO> login(@RequestBody EmployeeLoginDTO employeeLoginDTO){
        log.info("开始登录");
        Employee employee = employeeService.login(employeeLoginDTO);

        HashMap<String,Object> map = new HashMap<>();
        map.put(JwtClaimsConstant.EMP_ID,employee.getId());

        String token = JwtUtil.createJWT(jwtProperties.getAdminSecretKey(), jwtProperties.getAdminTtl(), map);

        EmployeeVO employeeVO = EmployeeVO.builder().id(employee.getId())
                .name(employee.getName())
                .username(employee.getUsername())
                .token(token)
                .profilePicture(employee.getProfilePicture())
                .build();

        return Result.success(employeeVO);

    }
    /**
     * 新增员工
     */
    @PostMapping("/register")
    public Result add(@ModelAttribute @Validated({EmployeeValidation.add.class,EmployeeValidation.update.class}) Employee employee, @RequestParam(value = "picture",required = false)MultipartFile porfilePicture)  {
        log.info("新增员工：{}",employee);
        employeeService.add(employee,porfilePicture);
        return Result.success();
    }
    /**
     * 根据id 查询员工
     */
    @GetMapping("/{id}")
    public Result<Employee> getById(@PathVariable Long id){
        log.info("根据id查询员工信息：{}",id);
        Employee employee = employeeService.getById(id);
        return Result.success(employee);
    }
    /**
     * 修改员工信息
     */
    @PutMapping
    public Result update(@ModelAttribute @Validated(EmployeeValidation.update.class) Employee employee, @RequestParam(value = "picture",required = false)MultipartFile profilePicture)  {
        log.info("修改员工信息：{}",employee);
        employeeService.update(employee,profilePicture);
        return Result.success();
    }
    
}
