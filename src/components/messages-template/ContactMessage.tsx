import Link from "next/link";

export default function ContactMessage() {
    return (
        <p>
            Jeśli chcesz się ze mną skontaktować: <br /> <ul><li>E-mail to: <Link className="text-purple-400 underline" href={'mailto:mkowalczyk193@gmail.com'}>mkowalczyk193@gmail.com</Link></li><li>Numer telefonu: <Link className="text-purple-400 underline" href={"tel:+48534867318"}>+48 534-867-318</Link></li></ul>
        </p>
    );
}
