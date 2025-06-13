package com.mockapi.repository;

import com.mockapi.model.MockEndpoint;
import com.mockapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MockEndpointRepository extends JpaRepository<MockEndpoint, Long> {
    List<MockEndpoint> findByUser(User user);
    Optional<MockEndpoint> findByPathAndHttpMethodAndUser(String path, String httpMethod, User user);
    Optional<MockEndpoint> findByPathAndHttpMethodAndUserAndActive(String path, String httpMethod, User user, boolean active);
}