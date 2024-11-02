import './itemImgBlock.css';

export const ItemImgBlock = ({imgPath, description="Изображение"}: {imgPath: string, description?: string}) => {
  return (
    <div className="block_img">
      <img src={imgPath} alt={description} />
    </div>
  )
}
