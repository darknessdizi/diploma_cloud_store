import './itemDescriptionBlock.css';

export const ItemDescriptionBlock = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="block_discription">
      {children}
    </div>
  )
}
