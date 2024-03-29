import Head from 'next/head';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Echo&apos;s Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-fluid">
        <div className="jumbotron">
          <h1>Portfolio</h1>
          <h3>
            {' '}
            Contact Me at: <a href="mailto:admin@sophiesolo.biz">admin@sophiesolo.biz</a>
          </h3>
          <h2>Backend Web Developer for NC Central University</h2>
          <h2>Experienced with Druapl CMS, Twig Templates, HTML, CSS, PHP, and JS</h2>

          <h3>Work Experience</h3>
          <ol>
            <li>Complete weekly Code Base updates via Acquia Cloud Platform</li>
            <li>Update deprecated code and Drupal modules</li>
            <li>Assist with daily Web Services tickets such as webpage updates and creations</li>
            <li>Create webforms via Drupal CMS and NextGen</li>
          </ol>

          <h3>Personal Projects:</h3>
          <ol>
            <li>
              <Link href="/size-converter">
                <a>Size Converter App</a>
              </Link>
            </li>
            <ul>
              <li>Created app using React</li>
              <li>Provides templates for user based on typical clothes sizing charts</li>
              <li>Automatically adds and removes rows as needed</li>
              <li>Converts sizes from metric to imperial for easier international shopping</li>
            </ul>
            <li>
              <a href="https://github.com/SophieOrgana/relationship_app">
                Relationship Molecule App
              </a>
            </li>
            <ul>
              <li>Built backend in Python(Flask)</li>
              <li>Created database using MySQL</li>
              <li>Wrote a simple HTML webpage to test data insertion and deletion</li>
            </ul>
            <li>
              <a href="https://github.com/SophieOrgana/dice-roller">Dice Rolling App</a>
            </li>
            <ul>
              <li>
                <a href="https://roller.sophiesolo.biz">Link to app</a>
              </li>
              <li>Built backend in Python(Flask)</li>
              <li>
                Python code allows visitors to roll a unique dice set for the{' '}
                <a href="https://www.fantasyflightgames.com/en/products/star-wars-edge-of-the-empire/">
                  Edge of the Empire
                </a>{' '}
                tabletop game
              </li>
              <li>Will write a webpage in HTML and CSS to act as user interface for the app</li>
            </ul>
            <li>
              <a href="https://github.com/SophieOrgana/discord-bot">Discord Bot App</a>
            </li>
            <ul>
              <li>Created database using MySQL</li>
              <li>
                Wrote a function in python that scrubs the data and prepares it for the database
              </li>
              <li>Wrote Discord bot in python that writes messages to the database</li>
              <li>Also wrote a side application to plot data using Python libraries</li>
              <ul>
                <li>
                  <a href="https://github.com/SophieOrgana/houseplots">Link to app</a>
                </li>
              </ul>
            </ul>
          </ol>
        </div>
      </div>
    </div>
  );
}
