//package com.endspring.pictalk.module.chat.config;
//
//import com.endspring.pictalk.module.chat.handler.ChatHandler;
//import org.springframework.beans.BeansException;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.ApplicationContextAware;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.MediaType;
//import org.springframework.web.reactive.config.ViewResolverRegistry;
//import org.springframework.web.reactive.config.WebFluxConfigurer;
//import org.springframework.web.reactive.function.server.RequestPredicates;
//import org.springframework.web.reactive.function.server.RouterFunction;
//import org.springframework.web.reactive.function.server.RouterFunctions;
//import org.springframework.web.reactive.function.server.ServerResponse;
//import org.thymeleaf.spring5.ISpringWebFluxTemplateEngine;
//import org.thymeleaf.spring5.SpringWebFluxTemplateEngine;
//import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
//import org.thymeleaf.spring5.view.reactive.ThymeleafReactiveViewResolver;
//import org.thymeleaf.templatemode.TemplateMode;
//import org.thymeleaf.templateresolver.ITemplateResolver;
//
//import java.util.HashMap;
//
//@Configuration
//public class RouteConfig implements WebFluxConfigurer, ApplicationContextAware {
//    ApplicationContext context;
//
//    @Bean
//    public RouterFunction<ServerResponse> route(ChatHandler handler) {
//        return RouterFunctions.route(
//                RequestPredicates.GET("/test").and(RequestPredicates.accept(MediaType.TEXT_PLAIN)), handler::readAllRoom);
//    }
//
//    @Bean RouterFunction<ServerResponse> chat(){
//        return RouterFunctions.route(RequestPredicates.GET("/").and(RequestPredicates.accept(MediaType.TEXT_HTML)),
//                req -> ServerResponse.ok().render("app/chat/chat", new HashMap<Object, Object>()));
//    }
//
//    @Bean
//    public ITemplateResolver thymeleafTemplateResolver() {
//        final SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
//        resolver.setApplicationContext(this.context);
//        resolver.setPrefix("classpath:templates/");
//        resolver.setSuffix(".html");
//        resolver.setCharacterEncoding("UTF-8");
//        resolver.setTemplateMode(TemplateMode.HTML);
//        resolver.setCacheable(false);
//        resolver.setCheckExistence(false);
//        return resolver;
//    }
//
//    @Bean
//    public ISpringWebFluxTemplateEngine thymeleafTemplateEngine() {
//        SpringWebFluxTemplateEngine templateEngine = new SpringWebFluxTemplateEngine();
//        templateEngine.setTemplateResolver(thymeleafTemplateResolver());
//        return templateEngine;
//    }
//
//    @Bean
//    public ThymeleafReactiveViewResolver thymeleafReactiveViewResolver() {
//        ThymeleafReactiveViewResolver viewResolver = new ThymeleafReactiveViewResolver();
//        viewResolver.setTemplateEngine(thymeleafTemplateEngine());
//        return viewResolver;
//    }
//
//    @Override
//    public void configureViewResolvers(ViewResolverRegistry registry) {
//        registry.viewResolver(thymeleafReactiveViewResolver());
//    }
//
//    @Override
//    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
//
//    }
//}
