package com.zlz.pigcounter.controller;


import com.common.pojo.dto.EmployeeLoginDTO;
import com.common.pojo.entity.Employee;
import com.common.pojo.vo.EmployeeVO;
import com.common.result.PageResult;
import com.common.result.Result;
import com.common.validation.EmployeeValidation;

import com.zlz.pigcounter.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@RequestMapping("/user")
public class EmployeeController {
    @Autowired
    @Qualifier("employeeServiceImpl")
    private EmployeeService employeeService;

    @Autowired
    private CacheManager cacheManager;

    /**
     * 员工登录
     *
     * @param employeeLoginDTO
     * @return
     */
    @PostMapping("/login")
    public Result<EmployeeVO> login(@RequestBody EmployeeLoginDTO employeeLoginDTO) {
        log.info("开始登录");
        EmployeeVO employeeVo = employeeService.login(employeeLoginDTO);
        return Result.success(employeeVo);

    }

    /**
     * 新增员工
     */
    @PostMapping("/register")
    @CacheEvict(cacheNames = "employee_page", allEntries = true)
    public Result add(@ModelAttribute @Validated({EmployeeValidation.add.class, EmployeeValidation.update.class}) Employee employee, @RequestParam(value = "picture", required = false) MultipartFile profilePicture) {
        log.info("新增员工：{}", employee);
        employeeService.add(employee, profilePicture);
        return Result.success();
    }


    /**
     * 修改员工信息
     */
    @PutMapping
    @CacheEvict(cacheNames = "employee_page", allEntries = true)
    public Result update(@ModelAttribute @Validated(EmployeeValidation.update.class) Employee employee, @RequestParam(value = "picture", required = false) MultipartFile profilePicture) {
        log.info("修改员工信息：{}", employee);
        employeeService.update(employee, profilePicture);
        return Result.success();
    }

    /**
     * 根据id删除员工
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    @CacheEvict(cacheNames = "employee_page", allEntries = true)
    public Result deleteById(@PathVariable Long id) {
        log.info("删除员工：{}", id);
        employeeService.deleteById(id);
        return Result.success();
    }

    /**
     * 根据属性查询员工
     * @param employee
     * @return
     */
    @PostMapping("/search")
    public Result<PageResult> getEmployeesByAttributes(@RequestBody Employee employee ){
        log.info("根据属性查询员工：{}", employee);
        return Result.success(employeeService.getEmployeesByAttributes(employee));
    }

    @DeleteMapping("/batch")
    @CacheEvict(cacheNames = "employee_page", allEntries = true)
    public Result deleteByIds(@RequestBody Long[] ids) {
        log.info("批量删除员工：{}", ids);

        for (Long id : ids) {
            Cache employee = cacheManager.getCache("employee");
            if(employee != null) employee.evict(id.toString());
        }
        employeeService.deleteByIds(ids);
        return Result.success();
    }

    /**
     * 分页查询员工
     */
    @GetMapping("/page")
    @Cacheable(cacheNames = "employee_page", key = "#pageNum+'-'+#pageSize+'-'+#organization")
    public Result<PageResult> page(int pageNum, int pageSize, Long organization) {
        log.info("分页查询员工：{}", pageNum, pageSize, organization);
        return Result.success(employeeService.page(pageNum, pageSize, organization));
    }


    /**
     * 登出
     */
    @PostMapping("/logout")
    public Result logout(){
        log.info("登出");
        return Result.success();
    }

    /**
     * 根据id查询员工
     *
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public Result<Employee> getById(@PathVariable Long id) {
        log.info("根据id查询员工：{}", id);
        return Result.success(employeeService.getById(id));
    }
}
