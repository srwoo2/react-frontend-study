'use client'
import React, { FormEvent, useState } from 'react'
import styles from './Reset.module.scss'
import { Loader, Heading } from '@monorepo-library/common'
import Input from '@/components/Input/Input'
import { Button } from '@monorepo-library/common'
import Link from 'next/link'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { toast } from 'react-toastify'

const ResetClient = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const resetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false)

        toast.success('비밀번호 업데이트를 위해서 이메일을 체크해주세요.')
      })
      .catch((error) => {
        setIsLoading(false)

        toast.error(error.message)
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.form}>
            <Heading title='비밀번호 업데이트' subtitle='이메일 주소를 입력해주세요.' />

            <form onSubmit={resetPassword}>
              <Input
                id='reset'
                label='reset'
                type='text'
                placeholder='Email'
                required
                value={email}
                className={styles.control}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <Button type='submit'>업데이트</Button>
              </div>

              <div className={styles.links}>
                <p>
                  <Link href='/login'>-로그인</Link>
                </p>
                <p>
                  <Link href='/register'>-회원가입</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default ResetClient
