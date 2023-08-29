from django.core.exceptions import ValidationError
from django.core.files.images import get_image_dimensions

def image_validator(image):
    min_height = 500
    min_width = 700
    img_width, img_height = get_image_dimensions(image)
    if img_height < min_height or img_width< min_width:
        raise ValidationError("image width or height is too small. Minimum size is 700x500px")
    
def logo_validator(image):
    max_height = 500
    max_width = 500
    img_width, img_height = get_image_dimensions(image)
    if img_width > max_width & img_height > max_height:
        raise ValidationError("Logo height and width exceed max (500px x 500px)")
    if img_height > max_height:
        raise ValidationError("Logo exceeds max height (500px)")
    if img_width > max_width:
        raise ValidationError("Logo exceeds max width (500px)")
    