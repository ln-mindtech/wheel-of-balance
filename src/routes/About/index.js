import React from 'react';
import './index.css';
import {TopButton} from "../../components/TopButton";
import guaranteed from '../../images/100-guaranteed.png';
import {Link} from "react-router-dom";
import {ContactFormer} from "../../components/ContactForm";

const About = () => {
    return (
        <div className={'about-div'}>
            <TopButton/>
            <div className={'about-content'}>
                <h1>What Is MindTech?</h1>
                <p>
                    <strong>Mind.Tech</strong> is a science-backed coaching program
                    that helps people make significant, measurable progress in a chosen area of their life:
                </p>
                <div>
                    <table className={"balance-sphere table table-bordered "}>
                        <tbody>
                        <tr>
                            <td>Career</td>
                            <td>Friends</td>
                            <td>Health</td>
                            <td>Money</td>
                        </tr>
                        <tr>
                            <td>Family</td>
                            <td>Fun</td>
                            <td>Love</td>
                            <td>Spirituality</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h4>This Program is Created and Supported By:</h4>
                <div>
                    <table className={"program-supported table table-bordered "}>
                        <tbody>
                        <tr>
                            <td>Psychologists, life, family, and relationship consultants with no less than 10 years of practical experience.</td>
                            <td>Business, career, and financial advisors, all with extensive practice and diverse experience in their fields.</td>
                            <td>Coaches and mentors who will track your progress, answer your questions, and help you stay on track to achieve results.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
               <h4>Progress Is Guaranteed</h4>
                <div>
                    <table className={"program-supported table table-bordered "}>
                        <tbody>
                        <tr>
                            <td><img className={'guaranteed-icon'} src={guaranteed} alt="guaranteed-wheel-icon" /></td>
                            <td>
                                We're confident that after 30 days, you'll notice a tangible difference and appreciate the results.

                                Otherwise, if you're not satisfied with your experience, you can request a refund at any time during the program or within 14 days after completing it, with no hassle on your first request.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <h4>How Does The Program Go?</h4>
                <ol>
                    <li>
                        <strong>
                            <Link to="/">
                                <label className={'sing-up'}>
                                    Sign up
                                </label>
                            </Link>
                            {' '}
                            and complete a short questionnaire
                        </strong>
                        {' '}
                        to share more about your chosen life area, experience, and goals. This information will help us familiarize with your story and ensure a personalized and fruitful experience during the program.
                    </li>
                    <li>
                        <strong>You'll receive a package of preparational materials</strong> within 48 hours of signing up. These resources will help you assess your current state more accurately, fine-tune your approach, and kickstart your creative process even before the program officially begins.
                    </li>
                    <li>
                        <strong>You'll receive detailed access instructions</strong> several days prior to the start date, and on January 18th, the journey will begin!
                    </li>
                    <li>
                        <strong>At the program's conclusion</strong>, we'll conduct another assessment to track your progress and offer valuable insights and advice to fuel your continued success.
                    </li>
                </ol>
                <p>The program is conducted entirely online. It includes:</p>
                <div>
                    <table className={"program-supported table table-bordered "}>
                        <tbody>
                        <tr>
                            <td>Daily video lessons, tailored to your life area and aimed for your success.</td>
                            <td>Simple yet powerful daily tasks which you can complete at any time of the day.</td>
                            <td>Several additional resources daily to supercharge your progress.</td>
                            <td>Access to additional features depending on your chosen program format.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h4>Do You Have Any Questions?</h4>
                <p>Please fill in the form with your request, and we'll get back to you within 48 hours:</p>
                <ContactFormer/>
            </div>
        </div>
    );
}

export default About