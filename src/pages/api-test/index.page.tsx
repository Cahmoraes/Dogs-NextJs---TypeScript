import styles from '../../styles/api.module.css'
import CreateUser from './CreateUser'
import PhotoGet from './PhotoGet'
import PhotoPost from './PhotoPost'
import Token from './Token'

export default function ApiTest() {
  return (
    <div className={styles.api}>
      <h2>Create User</h2>
      <CreateUser />
      <h2>Token</h2>
      <Token />
      <h2>Photo POST</h2>
      <PhotoPost />
      <h2>Photo GET</h2>
      <PhotoGet />
    </div>
  )
}
