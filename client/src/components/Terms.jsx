import React from "react";
import './privacy_terms.css'

function TermsOfService() {
  const containerStyle = {
    fontFamily: `"Nunito Sans", sans- serif`,
    fontSize: '18px',
    lineHeight: '1.6',
  };

  const h1Style = {
    textAlign: 'center',
    fontSize: '35px',
    marginTop: '20px',
  };

  const h2Style = {
    textAlign: 'center',
    fontSize: '24px',
    marginTop: '20px',
  };

  const pStyle = {
    textAlign: 'left',
    margin: '10px auto',
    maxWidth: '800px',
  };

  const ulStyle = {
    listStyleType: 'none',
    textAlign: 'left',
    paddingLeft: 250,
    marginRight: '250px',
  };

  const liStyle = {
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <div className="box">
        <h2 style={h1Style}>Jasmin Terms of Service</h2>
        <p style={pStyle}>
          These Terms of Service govern your use of the website located at https://www.jasmin.com and any related services provided by Jasmin.
          </p>
        <p style={pStyle}>
          By accessing https://www.jasmin.com, you agree to abide by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these Terms of Service, you are prohibited from using or accessing this website or using any other services provided by Jasmin.
        </p>
        <p style={pStyle}>
          We, Jasmin, reserve the right to review and amend any of these Terms of Service at our sole discretion. Upon doing so, we will update this page. Any changes to these Terms of Service will take effect immediately from the date of publication.
        </p>
        <p style={pStyle}>
          These Terms of Service were last updated on <b>April 24, 2024</b>.
        </p>
      </div>
      <div className="box">
        <h2 style={h2Style}>Limitations of Use</h2>
        <p style={pStyle}>By using this website, you warrant on behalf of yourself, your users, and other parties you represent that you will not:</p>
        <ul style={{ ...ulStyle, fontWeight: 'bold', listStyleType: 'disc'}}>
          <li style={liStyle}>modify, copy, prepare derivative works of, decompile, or reverse engineer any materials and software contained on this website;</li>
          <li style={liStyle}>remove any copyright or other proprietary notations from any materials and software on this website;</li>
          <li style={liStyle}>transfer the materials to another person or "mirror" the materials on any other server;</li>
          <li style={liStyle}>knowingly or negligently use this website or any of its associated services in a way that abuses or disrupts our networks or any other service Jasmin provides;</li>
          <li style={liStyle}>use this website or its associated services to transmit or publish any harassing, indecent, obscene, fraudulent, or unlawful material;</li>
          <li style={liStyle}>use this website or its associated services in violation of any applicable laws or regulations;</li>
          <li style={liStyle}>use this website in conjunction with sending unauthorized advertising or spam;</li>
          <li style={liStyle}>harvest, collect, or gather user data without the user’s consent; or</li>
          <li style={liStyle}>use this website or its associated services in such a way that may infringe the privacy, intellectual property rights, or other rights of third parties.</li>
        </ul>
        <h2 style={h2Style}>Intellectual Property</h2>
        <p style={pStyle}>The intellectual property in the materials contained in this website are owned by or licensed to Jasmin and are protected by applicable copyright and trademark law. We grant our users permission to download one copy of the materials for personal, non-commercial transitory use.</p>
        <p style={pStyle}>This constitutes the grant of a license, not a transfer of title. This license shall automatically terminate if you violate any of these restrictions or the Terms of Service, and may be terminated by Jasmin at any time.</p>
      </div>
      <div className="box">  
        <h2 style={h2Style}>Liability</h2>
        <p style={pStyle}>Our website and the materials on our website are provided on an 'as is' basis. To the extent permitted by law, Jasmin makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property, or other violation of rights.</p>
        <p style={pStyle}>In no event shall Jasmin or its suppliers be liable for any consequential loss suffered or incurred by you or any third party arising from the use or inability to use this website or the materials on this website, even if Jasmin or an authorized representative has been notified, orally or in writing, of the possibility of such damage.</p>
        <p style={pStyle}>In the context of this agreement, "consequential loss" includes any consequential loss, indirect loss, real or anticipated loss of profit, loss of benefit, loss of revenue, loss of business, loss of goodwill, loss of opportunity, loss of savings, loss of reputation, loss of use and/or loss or corruption of data, whether under statute, contract, equity, tort (including negligence), indemnity or otherwise.</p>
        <p style={pStyle}>Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
        <h2 style={h2Style}>Accuracy of Materials</h2>
        <p style={pStyle}>The materials appearing on our website are not comprehensive and are for general information purposes only. Jasmin does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on this website, or otherwise relating to such materials or on any resources linked to this website.</p>
        <h2 style={h2Style}>Links</h2>
        <p style={pStyle}>Jasmin has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement, approval or control by Jasmin of the site. Use of any such linked site is at your own risk and we strongly advise you make your own investigations with respect to the suitability of those sites.</p>
        <h2 style={h2Style}>Right to Terminate</h2>
        <p style={pStyle}>We may suspend or terminate your right to use our website and terminate these Terms of Service immediately upon written notice to you for any breach of these Terms of Service.</p>
        <h2 style={h2Style}>Severance</h2>
        <p style={pStyle}>Any term of these Terms of Service which is wholly or partially void or unenforceable is severed to the extent that it is void or unenforceable. The validity of the remainder of these Terms of Service is not affected.</p>
        <h2 style={h2Style}>Governing Law</h2>
        <p style={pStyle}>These Terms of Service are governed by and construed in accordance with the laws of United States. You irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
      </div>
      <div className="box">  
        <h2 style={h2Style}>Contact Us</h2>
        <ul style={ulStyle}>
          <li style={liStyle}>Jasmin</li>
          <li style={liStyle}>1 Castle Point Terrace</li>
          <li style={liStyle}>Hoboken, NJ 07030</li>
          <li style={liStyle}>United States</li>
          <li style={liStyle}><b>Phone: 2019046885</b></li>
          <li style={liStyle}><a href="mailto:lachicafenella@gmail.com">jasminhealth@jasmin.com</a></li>
        </ul>
      </div>
    </div>
  );
}

export default TermsOfService;
