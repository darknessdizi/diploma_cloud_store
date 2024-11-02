import './itemContentBlock.css';

export const ItemContentBlock = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="content_block">
      {children}
    </div>
  )
}
