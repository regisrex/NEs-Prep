package me.regisndiziihiwe.LearnSecurity;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(

        info = @Info(
                title = "Banking system",
                version = "v0.1",
                contact = @Contact(
                        name = "Regis NDIZIHIWE",
                        email = "regindizihiwe@gmail.com",
                        url = "https://regisndizihiwe.me"

                ),
                description = "Customers and their transactions APIS",
                license = @License(
                        name = "Apache 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0"
                )
        ),

        servers = @Server(
                url = "http://localhost:8080",
                description = "Production"
        )

)
@SecurityScheme(
        name = "BearerAuth",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)

public class OpenApiConfguration {
}
