package com.zlz.pigcounter.controller;

import com.common.pojo.entity.Building;
import com.common.result.PageResult;
import com.common.result.Result;
import com.zlz.pigcounter.service.BuildingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/building")
public class BuildingController {
    @Autowired
    BuildingService buildingService;

    /**
     * 添加楼栋
     * @param building
     * @return
     */
    @PostMapping("/add")
    @CacheEvict(cacheNames = "building_page",allEntries = true)
    public Result addBuilding(@RequestBody @Validated Building building){
        log.info("添加楼栋");
        buildingService.addBuilding(building);
        return Result.success();
    }

    /**
     * 根据id删除楼栋
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    @CacheEvict(cacheNames = "building_page",allEntries = true)
    public Result deleteBuilding(@PathVariable Long id){
        log.info("删除楼栋");
        buildingService.deleteBuilding(id);
        return Result.success();
    }

    /**
     * 分页查询楼栋
     * @param pageNum
     * @param pageSize
     * @return
     */
    @GetMapping("/page")
    @Cacheable(cacheNames = "building_page",key = "#pageNum+'-'+#pageSize")
    public Result<PageResult> page(int pageNum,int pageSize,int orgId){
        log.info("分页查询楼栋");
        return Result.success(buildingService.page(pageNum,pageSize,orgId));
    }

    /**
     * 修改楼栋信息
     * @param building
     * @return
     */
    @PutMapping
    @CacheEvict(cacheNames = "building_page",allEntries = true)
    public Result update(@RequestBody Building building){
        log.info("修改楼栋");
        buildingService.updateBuilding(building);
        return Result.success();
    }
}
