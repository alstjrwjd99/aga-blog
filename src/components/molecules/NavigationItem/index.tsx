import CustomIcon from '@/components/atoms/CustomIcon'
import Link from 'next/link'
import styles from './styles.module.scss'

interface NavigationItemProps {
  href: string
  label: string
  icon: string
  isActive?: boolean
  className?: string
}

export default function NavigationItem({
  href,
  label,
  icon,
  isActive = false,
  className = ''
}: NavigationItemProps) {
  return (
    <Link
      href={href}
      className={`${styles.navItem} ${isActive ? styles.active : ''} ${className}`}
    >
      <CustomIcon name={icon} size="md" color="rgba(255, 255, 255, 0.95)" />
      <span className={styles.navLabel}>{label}</span>
    </Link>
  )
}
