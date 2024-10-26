import { ItemFieldAdminDisk } from '../ItemFieldAdminDisk/ItemFieldAdminDisk';
import { ItemFieldUserDisk } from '../ItemFieldUserDisk/ItemFieldUserDisk';

export const ItemFieldDisk = ({ user }) => {
  return (
    <>
      <div className="conteiner__disk">

        { user.statusAdmin ? <ItemFieldAdminDisk user={user} /> : <ItemFieldUserDisk user={user} /> }

      </div>
    </>
  )
}
