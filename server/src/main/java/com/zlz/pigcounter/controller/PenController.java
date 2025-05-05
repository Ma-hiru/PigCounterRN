package com.zlz.pigcounter.controller;

import com.common.pojo.entity.Building;
import com.common.pojo.entity.Pen;
import com.common.result.PageResult;
import com.common.result.Result;
import com.zlz.pigcounter.service.BuildingService;
import com.zlz.pigcounter.service.PenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/pen")
public class PenController {
    @Autowired
    PenService penService;

    /**
     * 添加猪圈
     * @param pen
     * @return
     */
    @PostMapping("/add")
    @CacheEvict(cacheNames = "pen_page",allEntries = true)
    public Result addBuilding(@RequestBody @Validated Pen pen){
        log.info("添加猪圈");
        penService.addPen(pen);
        return Result.success();
    }

    /**
     * 根据id删除猪圈
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    @CacheEvict(cacheNames = "pen_page",allEntries = true)
    public Result deleteBuilding(@PathVariable Long id){
        log.info("删除猪圈");
        penService.deletePen(id);
        return Result.success();
    }

    /**
     * 分页查询猪圈
     * @param pageNum
     * @param pageSize
     * @param buildingId
     * @return
     */
    @GetMapping("/page")
    @Cacheable(cacheNames = "pen_page",key = "#pageNum+'-'+#pageSize")
    public Result<PageResult> page(int pageNum, int pageSize, Long buildingId){
        log.info("分页查询猪圈");
        return Result.success(penService.page(pageNum,pageSize,buildingId));
    }

    /**
     * 修改猪圈信息
     * @param pen
     * @return
     */
    @PutMapping
    @CacheEvict(cacheNames = "pen_page",allEntries = true)
    public Result update(@RequestBody Pen pen){
        log.info("修改猪圈信息");
        penService.updatePen(pen);
        return Result.success();
    }
}
