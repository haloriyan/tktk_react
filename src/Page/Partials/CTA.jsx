import styles from "./styles/CTA.module.css";

const CTA = () => {
    return (
        <div className={`${styles.CTA} rounded-more p-5 flex row item-center`}>
            <div className="flex column grow-1 mr-4">
                <h3 className={`text size-42 ${styles.CTATitle}`}>Mulai Berjualan dan Rasakan Kemudahan dalam Mengelola Bisnis Onlinemu</h3>
            </div>
            <img src="/images/illustration/chatting.png" alt="Chat" className={styles.CTAIllustration} />
        </div>
    )
}

export default CTA;