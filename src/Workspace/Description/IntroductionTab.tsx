import Typography from "@material-ui/core/Typography";
import { LINKS } from "./../../utils/constants";
import Markdown from "./../../utils/Markdown";
import React from "react";

const CHAP = "\xa7";

const INTRODUCTION = `
Welcome to the Source Academy playground!

The language _Source_ is the official language of the textbook [_Structure and
Interpretation of Computer Programs, JavaScript Adaptation_](${LINKS.TEXTBOOK}).
You have never heard of Source? No worries! It was invented just for the purpose
of the book. Source is a sublanguage of ECMAScript 2016 (7th edition) and defined
in [the documents titled _"Source ${CHAP}x"_](${LINKS.SOURCE_DOCS}), where x
refers to the respective textbook chapter. For example, Source ${CHAP}3 is
suitable for textbook chapter 3 and the preceeding chapters.

The playground comes with an editor and a REPL, on the left and right of the
screen, respectively. You may customise the layout of the playground by
clicking and dragging on the right border of the editor, or the top border of
the REPL.
`;

const IntroductionTab: React.FC = () => {
  return (
    <Typography variant="body2" component="p">
      <Markdown content={INTRODUCTION} openLinksInNewWindow={true} />,
    </Typography>
  );
};

export default IntroductionTab;
