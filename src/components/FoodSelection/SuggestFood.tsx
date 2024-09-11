import Card from '../Card/Card'
import styles from './SuggestFood.module.css'


export default function SuggestFood() {
  return (
    <>
      <p className={styles.title}>Add from suggestions</p>
      <div className={styles.container}>
        <Card>some content</Card>
        <Card>some content</Card>
        <Card>some content</Card>
        <Card>some content</Card>
        <Card>some content</Card>
        <Card>some content</Card>
        <Card>some content</Card>
      </div>
    </>
  )
}