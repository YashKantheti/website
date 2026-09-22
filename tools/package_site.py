"""Package the committed static site for Sites, without repository internals."""
from io import BytesIO
import json
from pathlib import Path
import subprocess
import tarfile

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ("index.html", "style.css", "script.js", "favicon.svg", "assets/aircraft.svg")


def git(*args):
    return subprocess.check_output(["git", "-C", str(ROOT), *args])


def main():
    commit = git("rev-parse", "HEAD").decode().strip()
    config = git("show", f"{commit}:.openai/hosting.json")
    directory = json.loads(config)["static"]["directory"]
    if directory != "dist":
        raise ValueError("Expected the configured static output directory to be dist")
    output = ROOT / ".artifacts" / "site.tar"
    output.parent.mkdir(exist_ok=True)
    files = {".openai/hosting.json": config}
    for asset in ASSETS:
        files[f"{directory}/{asset}"] = git("show", f"{commit}:{asset}")
    with tarfile.open(output, "w") as archive:
        for name, data in files.items():
            entry = tarfile.TarInfo(name)
            entry.size = len(data)
            entry.mode = 0o644
            entry.mtime = 0
            archive.addfile(entry, BytesIO(data))
    print(f"Source commit: {commit}")
    print(f"Packaged {len(files)} files: {output}")


if __name__ == "__main__":
    main()
