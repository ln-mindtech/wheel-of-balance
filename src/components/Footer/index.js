import React from "react";
import { Footer as FooterReact } from 'flowbite-react';
import './index.css';

export const Footer = () => {
    return (
        <FooterReact container>
            <FooterReact.Divider />
            <FooterReact.LinkGroup>
                <FooterReact.Link href="/about">About</FooterReact.Link>
                <FooterReact.Link href="#"> | </FooterReact.Link>
                <FooterReact.Link href="/privacy-policy">Privacy Policy</FooterReact.Link>
                <FooterReact.Link href="#"> | </FooterReact.Link>
                <FooterReact.Link href="/term-conditions">Terms & Conditions</FooterReact.Link>
            </FooterReact.LinkGroup>
            <FooterReact.Copyright href="#" by="Zomaredio LTD" />
            <FooterReact.LinkGroup className={"after-copyright"}>
                <FooterReact.Link href="#">Registered Address: Ifigeneias 14, 3036, Limassol, Cyprus</FooterReact.Link>
                <FooterReact.Link href="#">Registration Number: HE408788</FooterReact.Link>
                <FooterReact.Link href="#">Streamco Limited</FooterReact.Link>
            </FooterReact.LinkGroup>
        </FooterReact>
    );
}