package Common.pojo.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeVO {
    private Long id;

    private String name;

    private String sex;

    private String phone;

    //jwt令牌
    private String token;
}
