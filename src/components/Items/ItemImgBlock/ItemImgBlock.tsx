import './itemImgBlock.css';

export const ItemImgBlock = ({imgPath, description = "Изображение"}) => {
  return (
    <div className="block_img">
      <img src={imgPath} alt={description} />
    </div>
  )
}
