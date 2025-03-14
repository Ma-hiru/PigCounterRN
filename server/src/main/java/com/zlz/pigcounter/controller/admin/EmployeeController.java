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
    public Result add( @ModelAttribute @Validated Employee employee, @RequestParam("picture")MultipartFile porfilePicture) throws IOException {
        log.info("新增员工：{}",employee);
        employeeService.add(employee,porfilePicture);
        return Result.success();
    }
}
