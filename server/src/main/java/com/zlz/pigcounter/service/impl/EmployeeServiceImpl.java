package com.zlz.pigcounter.service.impl;

import com.common.constant.ImageConstant;
import com.common.constant.JwtClaimsConstant;
import com.common.context.BaseContext;
import com.common.exception.*;
import com.common.pojo.entity.Employee;
import com.common.pojo.entity.ProfilePicture;
import com.common.pojo.vo.EmployeeVO;
import com.common.result.PageResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zlz.pigcounter.mapper.EmployeeMapper;
import com.common.pojo.dto.EmployeeLoginDTO;

import com.zlz.pigcounter.mapper.ProfilePictureHistoryMapper;
import com.common.properties.JwtProperties;
import com.zlz.pigcounter.service.EmployeeService;
import com.zlz.pigcounter.service.OrganizationService;
import com.zlz.pigcounter.utils.JwtUtil;
import com.zlz.pigcounter.utils.ImageUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@Slf4j
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private ProfilePictureHistoryMapper profilePictureHistoryMapper;

    @Autowired
    private Pbkdf2PasswordEncoder passwordEncoder;

    @Autowired
    JwtProperties jwtProperties;

    @Value("${zlz.image.save-path}")
    private String imageSavePath;

    @Override
    public EmployeeVO login(EmployeeLoginDTO employeeLoginDTO) {

        String username = employeeLoginDTO.getUsername();
        String password = employeeLoginDTO.getPassword();

        log.info("用户名：{}，密码：{}", username, password);

        Employee employee = employeeMapper.getByUsername(username);
        if(employee==null){
            throw new NotFoundUserException();
        }



        if(!passwordEncoder.matches(password,employee.getPassword())){
            throw new PasswordError();
        }
        HashMap<String,Object> map = new HashMap<>();
        map.put(JwtClaimsConstant.EMP_ID,employee.getId());

        String token = JwtUtil.createJWT(jwtProperties.getAdminSecretKey(), jwtProperties.getAdminTtl(), map);

        EmployeeVO employeeVo = EmployeeVO.builder().id(employee.getId())
                .name(employee.getName())
                .username(employee.getUsername())
                .token(token)
                .profilePicture(employee.getProfilePicture())
                .organization(organizationService.getOrganizationNameById(employee.getOrgId()))
                .admin(employee.getAdmin())
                .build();


        return employeeVo;
    }


    @Override
    @Transactional
    public void add( Employee employee, MultipartFile profilePicture)  {
        //确保只有管理员账号能创建管理员账号
        Long currentId = BaseContext.getCurrentId();
        String orgName=employee.getOrganization();
        Long orgId = organizationService.getOrganizationIdByName(orgName);
        if(orgId==null){
            throw new NotFoundOrganization();
        }
        if(employee.getAdmin()) {
            Employee currentEmployee = employeeMapper.getById(currentId);
            if (currentId == null || !currentEmployee.getAdmin()|| orgId.equals(currentEmployee.getOrgId())) {
                throw new UnauthorizedModificationException("只有同组织管理员能创建同组织管理员账号");
            }
        }

        if(employeeMapper.getByUsername(employee.getUsername())!=null){
            throw new UserAlreadyExistsException();
        }


        String filePath=null;
        String  password = passwordEncoder.encode(employee.getPassword());
        employee.setPassword(password);
        if(profilePicture !=null&&!profilePicture.isEmpty()){
            // 检查文件类型
            if (!ImageUtil.isValidImageFile(profilePicture)) {
                throw new ProfilePictureUploadException("上传的文件不是有效的图片文件");
            }
             filePath= ImageUtil.getNewImagePath(profilePicture, imageSavePath, ImageConstant.PROFILE_PICTURE_PATH);
        }
        employee.setProfilePicture(ImageUtil.getFileNameWithExtension(filePath));
        employee.setCreateTime(LocalDateTime.now());
        employee.setOrgId(orgId);
        employeeMapper.insert(employee);

        ProfilePicture profilePictureHistory = ProfilePicture.builder()
                .employeeId(employee.getId())
                .profilePicture(filePath)
                .isCurrent(true)
                .uploadTime(LocalDateTime.now())
                .build();
        profilePictureHistoryMapper.insert(profilePictureHistory);
        try {
            ImageUtil.uploadImage(profilePicture,filePath,imageSavePath);
        } catch (IOException e) {
            throw new ProfilePictureUploadException("头像文件上传失败",e);
        }


    }



    @Override
    @Transactional
    public void update(Employee employee, MultipartFile profilePicture)  {
        //只有自己或者管理员能修改员工信息
        Long currentId = BaseContext.getCurrentId();
        Employee currentEmployee = employeeMapper.getById(currentId);
        if(!currentId.equals(employee.getId())&&!currentEmployee.getAdmin()&&!employee.getOrgId().equals(currentEmployee.getOrgId())){
           throw new UnauthorizedModificationException();
        }
        String filePath="";
        String  password = passwordEncoder.encode(employee.getPassword());
        employee.setPassword(password);
        if(profilePicture !=null&&!profilePicture.isEmpty()){
            // 检查文件类型
            if (!ImageUtil.isValidImageFile(profilePicture)) {
                throw new ProfilePictureUploadException("上传的文件不是有效的图片文件");
            }
            filePath= ImageUtil.getNewImagePath(profilePicture, imageSavePath, ImageConstant.PROFILE_PICTURE_PATH);
        }
        employee.setProfilePicture(ImageUtil.getFileNameWithExtension(filePath));
        ProfilePicture profilePictureHistory = ProfilePicture.builder()
                .employeeId(employee.getId())
                .profilePicture(filePath)
                .isCurrent(true)
                .uploadTime(LocalDateTime.now())
                .build();

        profilePictureHistoryMapper.updateIsCurrent(employeeMapper.getProfilePictureById(employee.getId()),false);

        employeeMapper.update(employee);

        profilePictureHistoryMapper.insert(profilePictureHistory);


        try {
            ImageUtil.uploadImage(profilePicture,filePath,imageSavePath);
        } catch (IOException e) {
            throw new ProfilePictureUploadException("头像文件上传失败",e);
        }

    }


    @Override
    public void deleteById(Long id) {
        //只有管理员和自己能删除自己的账号
        Long currentId = BaseContext.getCurrentId();
        Employee currentEmployee = employeeMapper.getById(currentId);
        if(!BaseContext.getCurrentId().equals(id)&&!currentEmployee.getAdmin()&&!employeeMapper.getById(id).getOrgId().equals(currentEmployee.getOrgId())){
            throw new UnauthorizedModificationException();
        }
        deleteProfilePicture(id);
        employeeMapper.deleteById(id);

    }



    @Override
    public PageResult page(int pageNum, int pageSize, String organization) {
        Long currentId = BaseContext.getCurrentId();
        Long orgId = organizationService.getOrganizationIdByName(organization);
        if(orgId==null){
            throw new NotFoundOrganization();
        }
        Employee currentEmployee = employeeMapper.getById(currentId);
        if(!currentEmployee.getAdmin()&&!currentEmployee.getOrgId().equals(orgId)){
            throw new BaseException("只有同组织管理员能查看同组织员工信息");
        }
        PageHelper.startPage(pageNum,pageSize);
        try (Page<Employee> page = employeeMapper.page(orgId)) {
            if (page == null) {
                throw new NotFoundUserException();
            }
            return new PageResult(page.getTotal(), page.getResult());
        }
    }

    @Override
    @Transactional
    public void deleteByIds(Long[] ids) {
        Long curentId = BaseContext.getCurrentId();
        Employee currentEmployee = employeeMapper.getById(curentId);
        for (Long id : ids) {
            if(!currentEmployee.getAdmin()||!employeeMapper.getById(id).getOrgId().equals(currentEmployee.getOrgId())){
                throw new UnauthorizedModificationException();
            }
            deleteProfilePicture(id);
        }
        profilePictureHistoryMapper.deleteByEmployeeIds(ids);
        employeeMapper.deleteBatch(ids);
    }

    private void deleteProfilePicture(Long id) {
        String employeeProfilePicture = employeeMapper.getProfilePictureById(id);
        if (employeeProfilePicture == null) {
            throw new NotFoundUserException();
        }
        List<String> profilePictures = profilePictureHistoryMapper.getByEmployeeId(id);
        for (String profilePicture : profilePictures) {
            File file = new File(profilePicture);
            if (file.exists()) {
                if(!file.delete()){
                    throw new ProfilePictureDeleteException();
                };
            }
            profilePictureHistoryMapper.deleteByProfilePicture(profilePicture);
        }
    }
}
