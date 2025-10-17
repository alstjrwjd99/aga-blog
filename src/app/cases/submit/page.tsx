'use client'

import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'
import RegionSelect from '@/components/forms/RegionSelect'
import CategorySelect from '@/components/molecules/CategorySelect'
import { useCategories, useCreateCase } from '@/hooks/useQueries'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './page.module.scss'

// 사례 등록 페이지 컴포넌트
export default function SubmitCasePage() {
  const router = useRouter()
  const createCaseMutation = useCreateCase()
  const { data: categories = [] } = useCategories()
  const [isMounted, setIsMounted] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    categories: [] as string[],
    amount: '',
    content: '',
    region: '',
    tip: '',
    incidentDate: '',
    scamLink: '',
    contactInfo: '',
    agreeToPolicy: false,
    captchaToken: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setIsMounted(true)
  }, [])


  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요'
    }

    if (formData.categories.length === 0) {
      newErrors.categories = '피싱 유형을 선택해주세요'
    }

    if (!formData.content.trim()) {
      newErrors.content = '피해 내용을 입력해주세요'
    }

    if (!formData.region) {
      newErrors.region = '지역을 선택해주세요'
    }

    if (!formData.agreeToPolicy) {
      newErrors.agreeToPolicy = '개인정보 처리방침에 동의해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isFormValid = () => {
    return formData.title.trim() &&
           formData.categories.length > 0 &&
           formData.content.trim() &&
           formData.region &&
           formData.agreeToPolicy
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // 피해 금액의 경우 추가 검증
    if (name === 'amount') {
      const numValue = parseInt(value)
      if (value && (isNaN(numValue) || numValue < 0 || numValue >= 10000000000)) {
        return // 유효하지 않은 값은 무시
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleRegionChange = (region: string) => {
    setFormData(prev => ({
      ...prev,
      region
    }))

    // 에러 메시지 제거
    if (errors.region) {
      setErrors(prev => ({
        ...prev,
        region: ''
      }))
    }
  }

  const handleCategorySelect = (categories: string[]) => {
    setFormData(prev => ({
      ...prev,
      categories
    }))

    // 에러 메시지 제거
    if (errors.categories) {
      setErrors(prev => ({
        ...prev,
        categories: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 폼 검증
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await createCaseMutation.mutateAsync({
        title: formData.title,
        category: formData.categories.join(', '),
        amount: formData.amount ? parseInt(formData.amount) : undefined,
        content: formData.content,
        region: formData.region,
        tip: formData.tip || undefined
      })

      setSubmitSuccess(true)

      // 3초 후 사례 목록으로 이동
      setTimeout(() => {
        router.push('/cases')
      }, 3000)

    } catch (error) {
      console.error('Failed to create case:', error)
      alert('사례 등록에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isMounted) {
    return (
      <div className={styles.submitPage}>
        <Container className={styles.submitContainer}>
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingContent}>
              <div className={styles.loadingSpinner} />
              <p className={styles.loadingText}>페이지를 불러오는 중...</p>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  // 성공 상태 UI
  if (submitSuccess) {
    return (
      <div className={styles.submitPage}>
        <Container className={styles.submitContainer}>
          <div className={styles.successState}>
            <Icon name="check-circle" size="xl" color="success" className={styles.successIcon} />
            <h1 className={styles.successTitle}>사례가 성공적으로 등록되었습니다!</h1>
            <p className={styles.successDescription}>
              등록해주신 사례가 검토 후 게시됩니다. 다른 사람들에게 도움이 될 것입니다.
            </p>
            <div className={styles.successActions}>
              <Button href="/cases" variant="primary" size="lg">
                사례 목록 보기
              </Button>
              <Button href="/cases/submit" variant="outline" size="lg">
                추가 사례 등록
              </Button>
            </div>
            <p className={styles.successRedirect}>
              3초 후 자동으로 사례 목록으로 이동합니다...
            </p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className={styles.submitPage}>
      <Container className={styles.submitContainer}>
        {/* 페이지 헤더 */}
        <div className={styles.submitHeader}>
          <h1 className={styles.submitTitle}>
            피싱 사례 등록
          </h1>
          <p className={styles.submitDescription}>
            실제 피해 사례를 등록하여 다른 사람들에게 도움을 주세요
          </p>
        </div>

        {/* 경고 메시지 */}
        <Card className={styles.warningCard}>
          <div className={styles.warningContent}>
            <Icon name="alert-triangle" size="lg" color="danger" className={styles.warningIcon} />
            <div className={styles.warningText}>
              <h3 className={styles.warningTitle}>중요한 안내사항</h3>
              <ul className={styles.warningList}>
                <li>• 개인정보나 민감한 정보는 포함하지 마세요</li>
                <li>• 허위 정보나 추측성 내용은 금지됩니다</li>
                <li>• 등록된 사례는 검토 후 공개됩니다</li>
                <li>• 긴급한 피해는 즉시 경찰서나 금융감독원에 신고하세요</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 등록 폼 */}
        <Card className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.submitForm}>
            {/* 기본 정보 */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>기본 정보</h2>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                              제목 <span className={styles.required}>*</span>
                            </label>
                            <Input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                              placeholder="피싱 사례의 제목을 입력하세요"
                              required
                              className={styles.formInput}
                            />
                            {errors.title && (
                              <div className={styles.errorMessage}>
                                {errors.title}
                              </div>
                            )}
                          </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  피싱 유형 <span className={styles.required}>*</span>
                </label>
                <CategorySelect
                  categories={categories}
                  value={formData.categories}
                  onSelect={handleCategorySelect}
                  placeholder="피싱 유형을 선택하거나 입력하세요"
                  className={styles.formSelect}
                  multiple={true}
                />
                {errors.categories && (
                  <div className={styles.errorMessage}>
                    {errors.categories}
                  </div>
                )}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>피해 발생일</label>
                  <Input
                    type="date"
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>피해 금액 (원)</label>
                  <Input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="피해 금액을 입력하세요"
                    className={styles.formInput}
                    min="0"
                    max="9999999999"
                    step="1"
                  />
                  <div className={styles.inputHint}>
                    최대 99억 9천만원까지 입력 가능합니다
                  </div>
                </div>
              </div>

                          <div className={styles.formGroup}>
                            <RegionSelect
                              value={formData.region}
                              onChange={handleRegionChange}
                              error={errors.region}
                              className={styles.formSelect}
                            />
                          </div>
            </div>

            {/* 상세 내용 */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>상세 내용</h2>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  피해 내용 <span className={styles.required}>*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="피해 사례의 상세한 내용을 입력하세요"
                  required
                  rows={8}
                  className={styles.formTextarea}
                />
                {errors.content && (
                  <div className={styles.errorMessage}>
                    {errors.content}
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>피싱 링크 또는 전화번호</label>
                <Input
                  type="text"
                  name="scamLink"
                  value={formData.scamLink}
                  onChange={handleInputChange}
                  placeholder="피싱에 사용된 링크나 전화번호를 입력하세요"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>예방 팁</label>
                <textarea
                  name="tip"
                  value={formData.tip}
                  onChange={handleInputChange}
                  placeholder="다른 사람들이 같은 피해를 당하지 않도록 도움이 되는 팁을 입력하세요"
                  rows={4}
                  className={styles.formTextarea}
                />
              </div>
            </div>

            {/* 연락처 정보 */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>연락처 정보 (선택사항)</h2>
              <p className={styles.sectionDescription}>
                추가 정보가 필요한 경우에만 연락드립니다. 개인정보는 공개되지 않습니다.
              </p>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>연락처</label>
                <Input
                  type="text"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  placeholder="이메일 또는 전화번호 (선택사항)"
                  className={styles.formInput}
                />
              </div>
            </div>

            {/* 약관 동의 */}
            <div className={styles.formSection}>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="agreeToPolicy"
                  name="agreeToPolicy"
                  checked={formData.agreeToPolicy}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, agreeToPolicy: e.target.checked }))
                    // 에러 메시지 제거
                    if (errors.agreeToPolicy) {
                      setErrors(prev => ({
                        ...prev,
                        agreeToPolicy: ''
                      }))
                    }
                  }}
                  className={styles.checkboxInput}
                />
                <label htmlFor="agreeToPolicy" className={styles.checkboxLabel}>
                  <span className={styles.required}>*</span> 개인정보 처리방침 및 이용약관에 동의합니다
                </label>
              </div>
              {errors.agreeToPolicy && (
                <div className={styles.errorMessage}>
                  {errors.agreeToPolicy}
                </div>
              )}
            </div>

            {/* 제출 버튼 */}
            <div className={styles.submitButtonGroup}>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className={styles.cancelButton}
              >
                취소
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className={styles.submitButton}
              >
                {isSubmitting ? '등록 중...' : '사례 등록'}
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </div>
  )
}
