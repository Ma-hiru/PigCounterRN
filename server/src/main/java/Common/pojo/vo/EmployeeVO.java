package Common.pojo.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeVO {
    private Long id;

    private String username;

    private String name;

    private String profilePicture;
    //jwt令牌
    private String token;

    private String organization;
}
