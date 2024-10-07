package com.gamezone.Backend.Controller;

import com.gamezone.Backend.Entity.Image;
import com.gamezone.Backend.Service.ImageService;
import com.gamezone.Backend.dto.ImageDTO;
import com.gamezone.Backend.mapper.ImageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping
    public List<ImageDTO> getAllImages() {
        List<Image> images = imageService.getAllImages();
        return images.stream()
                .map(ImageMapper::toImageDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImageDTO> getImageById(@PathVariable Long id) {
        Optional<Image> image = imageService.getImageById(id);
        return image.map(i -> ResponseEntity.ok(ImageMapper.toImageDTO(i)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ImageDTO createImage(@RequestBody ImageDTO imageDTO) {
        Image image = ImageMapper.toImage(imageDTO);
        Image createdImage = imageService.createImage(image);
        return ImageMapper.toImageDTO(createdImage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImageDTO> updateImage(@PathVariable Long id, @RequestBody ImageDTO imageDTO) {
        try {
            Image image = ImageMapper.toImage(imageDTO);
            image.setId(id); // Ensure we set the ID for the update
            Image updatedImage = imageService.updateImage(id, image);
            return ResponseEntity.ok(ImageMapper.toImageDTO(updatedImage));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        imageService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }
}

