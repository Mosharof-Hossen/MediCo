import { Link } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import PropTypes from 'prop-types';

const SocialLinks = (link) => {
    console.log(link);
    return (
        <div className="mb-5">
            <p className="text-center font-semibold">Already Sign Up? <Link to={ link.value}> <span className="underline">{link.value == "/sign-up"?"Sign Up":"Login"}</span></Link></p>
            <div className="divider divider-neutral w-1/2 mx-auto text-2xl font-semibold">OR</div>
            <div className="space-x-3 text-center">
                <button className="text-2xl rounded-full p-2 text-black  border-2 hover:text-primary-c  border-black"><FaGoogle></FaGoogle></button>
                <button className="text-2xl rounded-full p-2 text-black  border-2 hover:text-primary-c  border-black"><FaGithub></FaGithub></button>
            </div>
        </div>
    );
};

SocialLinks.propTypes = {
    link: PropTypes.object
};


export default SocialLinks;

