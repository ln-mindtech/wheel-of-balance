import React from 'react';
import {TopButton} from "../../components/TopButton";
import './index.css';

const PrivacyPolicy = () => {
    return (
        <div className={'privacy-policy-div'}>
            <TopButton/>
            <div className={'privacy-policy-content'}>
                <h1>PRIVACY AND COOKIE POLICY</h1>
                <p>This Privacy and Cookie Policy has been compiled to better serve those who are concerned with how their personal data is being processed. Please read our Privacy and Cookie Policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your personal data on our website.</p>
                <h4>TYPES OF INFORMATION AND REASONS FOR PROCESSING</h4>
                <p>To contact us, you are required to provide your email address and/or phone number. We process your contact information to be able to contact you in a convenient way (including via messengers). You may also disclose your first name, last name and country of residence. This information is processed so that we can personalize your interests and deliver content that you are most interested in. We may also process data about your browsing activities on this website in order to improve the content that is available.</p>

                <h4>COOKIES</h4>
                <p>Cookies are small files that websites transfer to your web browser. Cookies are necessary for the regular functioning of this website. Cookies help us to recognize your browser, capture and remember certain information, as well as to understand your preferences based on your browsing activities. This information helps us to improve this website.</p>
                <p>If you would like to find you more about cookies we advise you to visit www.aboutcookies.org.</p>

                <h4>DATA PROTECTION</h4>
                <p>We do not collect or retain your personal data longer than is necessary for the purposes explained above.</p>
                <p>We use technical and organisational measures in accordance with good practice to ensure appropriate security of your personal data against accidental or unlawful loss, alteration, theft, unauthorised disclosure or access, unauthorised use and all other unlawful forms of processing.</p>
                <p>Based on business needs and security requirements, we apply restrictions to access control of your personal data. Access to your personal data is only granted to trained staff with authorization, whose knowledge and skills are necessary to process the personal data that is gathered.</p>

                <h4>YOUR RIGHTS</h4>
                <p>You have all rights granted by the General Data Protection Regulation. If you feel that your rights are in violation, you have the right to lodge a complaint within your local or Cyprus Data Protection Authority. If you feel that your personal data rights have been breached or if you have any questions regarding your rights and/or the processing of your personal data on this website, please contact us.</p>

                <h4>THIRD-PARTY DISCLOSURE</h4>
                <p>We may need to share your personal data with third-party entities. These entities help us to regularly provide and further develop our services (e.g. analytics, maintenance, marketing, development, functionality improvement). The disclosure of your personal data to third parties is on the basis of relevant data protection agreements, which are created to ensure that your personal data is safe and secure.</p>
                <p>If we transfer your personal data to a recipient registered in a ‘Third country’, we will ensure that your data is transferred adequately and securely, in accordance with the applicable Data Protection Laws.</p>
                <p>Your personal data may be shared with public authorities and law enforcement agencies where it is necessary to do so and where we are legally required or permitted to do so.</p>

                <h4>DISABLING COOKIES</h4>
                <p>You can opt-out of being tracked of the third-party services.</p>
                <p>The most used web browsers allow you to manage the majority of cookies through the browser’s settings. Please keep in mind that if you limit the ability of websites to set cookies, you may worsen your overall user experience.</p>
                <p>If you do not want to receive cookies from our website, you can change your browser settings on a device you are using to access our services.</p>
                <h4>CHANGES TO THIS PRIVACY AND COOKIE POLICY</h4>

                <p>When necessary, this Policy will be updated. We therefore suggest that you review it on a regular basis.</p>

                <h4>CONTACT US</h4>
                <p>MindTech respects your right to know how we handle personal data.</p>
                <p>If you have any questions regarding this Privacy and Cookie Policy, please contact us.</p>
            </div>
        </div>
    );
}

export default PrivacyPolicy