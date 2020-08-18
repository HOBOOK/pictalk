package com.endspring.pictalk.module.chat.config;

import com.endspring.pictalk.module.chat.handler.ChatHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class RouteConfig {
    @Bean
    public RouterFunction<ServerResponse> route(ChatHandler handler) {
        return RouterFunctions.route(
                RequestPredicates.GET("/test").and(RequestPredicates.accept(MediaType.TEXT_PLAIN)), handler::readAllRoom);
    }
}
