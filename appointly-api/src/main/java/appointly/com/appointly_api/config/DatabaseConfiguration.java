package appointly.com.appointly_api.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfiguration {

    @Value("${spring.datasource.url}")
    String url;

    @Value("${spring.datasource.username}")
    String username;

    @Value("${spring.datasource.password}")
    String password;

    @Value("${spring.datasource.driver-class-name}")
    String driver;

    @Bean
    public DataSource hikariDataSource() {
        HikariConfig config = new HikariConfig();
        config.setUsername(username);
        config.setPassword(password);
        config.setDriverClassName(driver);
        config.setJdbcUrl(url);

        config.setMaximumPoolSize(10); // Maximo de conecoes liberadas
        config.setMinimumIdle(1); // tamanho inicial do pool
        config.setPoolName("appointly-db-pool");
        config.setMaxLifetime(600000);
        config.setConnectionTimeout(100000);
        config.setConnectionTestQuery("select 1"); // Query de teste

        return new HikariDataSource(config);
    }
}
