'use client'
import { Loader, Divider } from '@monorepo-library/common'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import styles from '../login/Auth.module.scss'
import Image from 'next/image'
import Input from '@/components/Input/Input'
import { Button } from '@monorepo-library/common'
import Link from 'next/link'

import LogoPath from '@/assets/colorful.svg'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/firebase'

const RegisterClient = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== cPassword) {
      return toast.error(`비밀번호가 일치하지 않습니다.`)
    }

    setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('user', user)

        setIsLoading(false)

        toast.success('등록 성공...')
        router.push('/login')
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
          <h1 className={styles.logo}>
            <Image priority src={LogoPath} alt='logo' />
          </h1>

          <form onSubmit={registerUser} className={styles.form}>
            {/* Input */}
            <Input
              email
              icon='letter'
              id='email'
              name='email'
              label='이메일'
              placeholder='아이디(이메일)'
              className={styles.control}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              password
              icon='lock'
              id='password'
              name='password'
              label='비밀번호'
              placeholder='비밀번호'
              className={styles.control}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              password
              icon='lock'
              id='password'
              name='password'
              label='비밀번호 확인'
              placeholder='비밀번호 확인'
              className={styles.control}
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />

            <div className={styles.buttonGroup}>
              {/* Button */}
              <Button type='submit' width='100%'>
                회원가입
              </Button>

              <Divider />

              <Button width='100%' secondary>
                <Link href={'/login'}>로그인</Link>
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default RegisterClient
