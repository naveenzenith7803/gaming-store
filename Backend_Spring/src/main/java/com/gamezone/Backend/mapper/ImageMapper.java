package com.gamezone.Backend.mapper;

import com.gamezone.Backend.Entity.Image;
import com.gamezone.Backend.dto.ImageDTO;

public class ImageMapper {

    // Convert Image entity to ImageDTO
    public static ImageDTO toImageDTO(Image image) {
        return new ImageDTO(
                image.getId(),
                image.getUrl()
        );
    }

    // Convert ImageDTO to Image entity
    public static Image toImage(ImageDTO imageDTO) {
        Image image = new Image();
        image.setId(imageDTO.getId()); // Set ID in case of update
        image.setUrl(imageDTO.getUrl());
        return image;
    }
}

