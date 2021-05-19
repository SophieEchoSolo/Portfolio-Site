type Props = { updateStyle: (newStyle: string) => void };

export default function Navbar({ updateStyle }: Props): JSX.Element {
  return (
    <nav id="topbar" className="navbar navbar-expand-lg navbar-inverse">
      <a id="pstyle" className="navbar-brand" href="#">
        Sophie Echo Solo
      </a>

      <div className="container-fluid" id="topButtons">
        <div>
          <a
            id="linkedin-button"
            href="https://www.linkedin.com/in/sophie-grey-lennon/"
            className="btn btn-primary btn-md active"
            role="button"
            type="button"
          >
            LinkedIn
          </a>
          <a
            id="github-button"
            href="https://github.com/SophieOrgana/"
            className="btn btn-primary btn-md active"
            role="button"
            type="button"
          >
            GitHub
          </a>
        </div>
        <div>
          <button
            type="button"
            onClick={() => updateStyle('firstStyle-selected')}
            data-toggle="button"
            aria-pressed="false"
            className="btn btn-primary btn-sm pull-right"
            name="styleSelector"
            id="mainStyle"
          >
            Style 1
          </button>
          <button
            type="button"
            onClick={() => updateStyle('secondStyle-selected')}
            data-toggle="button"
            aria-pressed="false"
            className="btn btn-primary btn-sm pull-right"
            name="styleSelector"
            id="altStyle"
          >
            Style 2
          </button>
          <button
            type="button"
            onClick={() => updateStyle('thirdStyle-selected')}
            data-toggle="button"
            aria-pressed="false"
            className="btn btn-primary btn-sm pull-right"
            name="styleSelector"
            id="thirdStyle"
          >
            Style 3
          </button>
        </div>
      </div>
    </nav>
  );
}
