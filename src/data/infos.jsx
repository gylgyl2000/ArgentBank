import BankTreeImage from '../assets/bank-tree.jpeg'
import chatIcon from '../assets/icon-chat.png'
import moneyIcon from '../assets/icon-money.png'
import securityIcon from '../assets/icon-security.png'

const infoHero = {
    bgImage: BankTreeImage,
    title: 'Promoted Content',
    subtitle1: 'No fees.',
    subtitle2: 'No minimum deposit.',
    subtitle3: 'High interest rates.',
    text: 'Open a savings account with Argent Bank today!',
}

const infoFeatures = [
    {
        id: 1,
        img: chatIcon,
        alt: 'Chat Icon',
        title: 'You are our #1 priority',
        text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
        id: 2,
        img: moneyIcon,
        alt: 'Money Icon',
        title: 'More savings means higher rates',
        text: 'The more you save with us, the higher your interest rate will be!',
    },
    {
        id: 3,
        img: securityIcon,
        alt: 'Security Icon',
        title: 'Security you can trust',
        text: 'We use top of the line encryption to make sure your data and money is always safe.',
    },
]

export { infoHero, infoFeatures }