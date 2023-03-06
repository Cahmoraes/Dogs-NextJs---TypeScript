import { GetServerSideProps } from 'next'

interface HomeProps {
  session: boolean
}

export default function Home({ session }: HomeProps) {
  console.log({ session })

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      session: 'caique',
    },
  }
}
