package com.gamezone.Backend.mapper;

import com.gamezone.Backend.Entity.User;
import com.gamezone.Backend.dto.UserCreateDTO;
import com.gamezone.Backend.dto.UserDTO;

public class UserMapper {

    // Convert User entity to UserDTO
    public static UserDTO toUserDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail());
    }

    // Convert UserCreateDTO to User entity for creation
    public static User toUser(UserCreateDTO userCreateDTO) {
        User user = new User();
        user.setUsername(userCreateDTO.getUsername());
        user.setEmail(userCreateDTO.getEmail());
        user.setPassword(userCreateDTO.getPassword());
        return user;
    }
}

