package com.zlz.pigcounter.controller.admin;

import Common.constant.JwtClaimsConstant;
import Common.pojo.dto.EmployeeLoginDTO;
import Common.pojo.entity.Employee;
import Common.pojo.vo.EmployeeVO;
import Common.result.Result;
import com.zlz.pigcounter.properties.JwtProperties;
import com.zlz.pigcounter.service.EmployeeService;
import com.zlz.pigcounter.utils.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/login")
    public Result<EmployeeVO> login(@RequestBody EmployeeLoginDTO employeeLoginDTO){
        log.info("aaa");
        Employee employee = employeeService.login(employeeLoginDTO);

        HashMap<String,Object> map = new HashMap<>();
        map.put(JwtClaimsConstant.EMP_ID,employee.getId());

        String token = JwtUtil.createJWT(jwtProperties.getAdminSecretKey(), jwtProperties.getAdminTtl(), map);

        EmployeeVO employeeVO = EmployeeVO.builder().id(employee.getId())
                .name(employee.getName())
                .sex(employee.getSex())
                .phone(employee.getPhone())
                .token(token)
                .build();

        return Result.success(employeeVO);

    }
}
