const question = (id, prompt, options, correctAnswer, explanation) => ({
  id,
  prompt,
  options,
  correctAnswer,
  explanation,
});

const topic = (id, title, objective, notes, questions) => ({
  id,
  title,
  objective,
  notes,
  questions,
});

export const units = [
  {
    id: "ict-foundations",
    number: "01",
    title: "ICT Foundations & Ethics",
    summary: "Understand information systems, digital responsibility, and ethical ICT use.",
    topics: [
      topic("ict-concepts", "ICT concepts and information systems", "Explain ICT and identify the parts of an information system.", ["ICT uses digital and communication technologies to collect, process, store, retrieve, and share information.", "An information system combines people, procedures, data, software, and hardware to support work and decisions.", "Data is a recorded fact; information is data organised in a meaningful context."], [
        question("ict-q1", "Which group best describes the components of an information system?", ["People, procedures, data, software, and hardware", "Printers, cables, and screens only", "Websites and social media only", "Electricity and furniture"], 0, "An information system includes people and procedures as well as data and technology."),
        question("ict-q2", "What makes data useful as information?", ["It is copied to a second device", "It is organised and interpreted in context", "It is stored for a long time", "It is converted into a file name"], 1, "Processing and context give data meaning that can support understanding or decisions."),
        question("ict-q3", "Which is an example of an ICT input activity?", ["Entering a student's marks into a system", "Displaying a printed report", "Archiving a completed report", "Reading a chart on screen"], 0, "Entering marks supplies data to the information system."),
      ]),
      topic("digital-ethics", "Digital ethics and responsible use", "Apply privacy, copyright, and responsible-use principles.", ["Personal information should be collected and shared only for a clear, lawful purpose and with appropriate safeguards.", "Copyright protects original creative work. Credit sources and follow licence conditions when reusing material.", "Acceptable-use rules describe responsible access to institutional devices, accounts, and networks."], [
        question("ethics-q1", "What is the responsible way to use a diagram found online in an assignment?", ["Remove its creator's name", "Credit the source and check reuse permissions", "Claim it as original work", "Share it publicly without checking its licence"], 1, "Attribution and licence checks respect the creator's rights."),
        question("ethics-q2", "Which action best protects a client's personal information?", ["Send it to a personal group chat", "Collect only what is needed and restrict access", "Leave printed records in a public area", "Use a shared public password"], 1, "Data minimisation and access controls reduce unnecessary exposure."),
        question("ethics-q3", "What should a learner do before installing software on a college computer?", ["Ignore institutional rules", "Follow the institution's acceptable-use and approval procedures", "Disable security settings", "Use another learner's credentials"], 1, "Institutional devices should be used under the institution's policies and approval process."),
      ]),
    ],
  },
  {
    id: "data-information",
    number: "02",
    title: "Data and Information",
    summary: "Represent, validate, process, and interpret data for useful information.",
    topics: [
      topic("data-quality", "Data representation and quality", "Describe common data types and data-quality checks.", ["Data may be numeric, textual, date/time, logical, or multimedia. The chosen representation should fit its use.", "Validation checks whether input follows rules such as range, type, length, or format; verification checks whether data matches its source.", "Accurate, complete, consistent, timely, and relevant data improves the quality of resulting information."], [
        question("quality-q1", "A field accepts only dates in DD/MM/YYYY format. This is an example of:", ["Format validation", "A backup", "Encryption", "Output design"], 0, "A format check tests that input follows the required date pattern."),
        question("quality-q2", "Which statement describes verification rather than validation?", ["Checking that age is between 0 and 120", "Comparing entered marks with the original mark sheet", "Checking that a field is not empty", "Requiring a number in a numeric field"], 1, "Verification compares captured data with its original source."),
        question("quality-q3", "Which data quality characteristic means information is current when needed?", ["Timeliness", "Duplication", "Formatting", "Compression"], 0, "Timely data is available and up to date for its intended use."),
      ]),
      topic("data-processing", "Data processing and information output", "Describe the input-process-output cycle and select suitable outputs.", ["The information-processing cycle commonly includes input, processing, output, and storage; feedback and control may also be part of a system.", "Processing can sort, classify, calculate, compare, summarise, or transform data.", "Reports, tables, charts, and alerts are outputs. Choose an output that suits the audience and decision."], [
        question("process-q1", "In the information-processing cycle, calculating a class average is:", ["Input", "Processing", "Output", "Storage"], 1, "Calculation transforms input marks into a summary value, so it is processing."),
        question("process-q2", "Which output is most useful for showing a monthly sales trend?", ["A line chart", "A list of device serial numbers", "A blank form", "A password file"], 0, "A line chart makes change over time easy to see."),
        question("process-q3", "Why should output be designed for its audience?", ["To make it harder to interpret", "To present relevant information clearly for its purpose", "To include every stored field", "To avoid checking accuracy"], 1, "Relevant, audience-appropriate output supports accurate interpretation and decisions."),
      ]),
    ],
  },
  {
    id: "operating-systems",
    number: "03",
    title: "Operating Systems & Software",
    summary: "Explain operating-system services and manage files and applications.",
    topics: [
      topic("os-functions", "Operating-system functions", "Identify how an operating system manages computer resources.", ["An operating system provides a user interface and manages processor time, memory, files, storage, and input/output devices.", "The operating system coordinates application requests and provides common services such as file access and device control.", "System software supports the computer's operation; application software helps users perform particular tasks."], [
        question("os-q1", "Which task is normally handled by an operating system?", ["Managing memory allocation to running programs", "Writing every user's report", "Creating the user's business rules", "Guaranteeing error-free applications"], 0, "Memory management is a core operating-system responsibility."),
        question("os-q2", "A word processor is best classified as:", ["Application software", "Firmware only", "An input device", "A network protocol"], 0, "A word processor is application software used for a specific user task."),
        question("os-q3", "What does a device driver help the operating system do?", ["Communicate with a hardware device", "Translate every language", "Create a user account automatically", "Replace the file system"], 0, "Drivers provide a software interface for controlling particular hardware."),
      ]),
      topic("files-and-security", "File management and system security", "Use file systems and basic account safeguards correctly.", ["A file system organises files and folders on storage. Clear names and a consistent folder structure make retrieval easier.", "Permissions determine which users can read, change, or execute files and folders.", "Updates, reputable software, backups, and strong authentication help protect a computer system."], [
        question("files-q1", "Which filename is clearest for a submitted report?", ["final2new.docx", "Report.docx", "ICT_Project_Report_2026.docx", "x.docx"], 2, "A descriptive name identifies the document's content and context."),
        question("files-q2", "What is the purpose of file permissions?", ["Control what actions users may perform on files", "Increase screen brightness", "Compress every file", "Change a file's author automatically"], 0, "Permissions define access such as reading, modifying, or executing a file."),
        question("files-q3", "Why keep a separate backup of important work?", ["To make the original file larger", "To recover data after loss or damage", "To remove the need for updates", "To share passwords"], 1, "A backup provides a recovery copy if the primary data is lost or damaged."),
      ]),
    ],
  },
  {
    id: "computer-applications",
    number: "04",
    title: "Computer Applications",
    summary: "Apply office productivity software to create, analyse, and present information.",
    topics: [
      topic("word-processing", "Word processing and document production", "Create and format a professional document using word-processing features.", ["Use styles and headings to create a consistent structure; use page layout, headers, footers, and page numbering where appropriate.", "Proofreading tools can identify possible spelling and grammar issues, but the author remains responsible for accuracy.", "Use tables, images, and citations purposefully. Save in the requested file format and use a clear filename."], [
        question("word-q1", "What is the main advantage of applying heading styles?", ["They create consistent formatting and support document navigation", "They automatically verify every fact", "They prevent the document from being edited", "They replace the need for paragraphs"], 0, "Styles apply consistent formatting and can be used to build navigation or a table of contents."),
        question("word-q2", "Which feature is most appropriate for numbering pages automatically?", ["Page number field in a header or footer", "Manual spaces at the bottom of each page", "A spreadsheet formula", "A text highlight"], 0, "Header and footer page-number fields update as the document changes."),
        question("word-q3", "Before submitting a document, what should the author do?", ["Proofread it and confirm the requested format", "Assume spell-check guarantees correctness", "Remove all headings", "Save over the source material"], 0, "Proofreading and checking the requested format are essential final checks."),
      ]),
      topic("spreadsheets-presentations", "Spreadsheets and presentations", "Use formulas, charts, and presentation design to communicate results.", ["A spreadsheet stores values in cells. Formulas begin with `=` and functions such as SUM calculate from cell references.", "Relative references adjust when copied; absolute references (for example `$B$2`) remain fixed.", "Presentations should support a spoken explanation: use readable text, consistent layouts, meaningful visuals, and concise content."], [
        question("apps-q1", "Which spreadsheet formula adds the values in cells B2 through B6?", ["=SUM(B2:B6)", "SUM=B2+B6", "=ADD(B2;B6)", "B2:B6=SUM"], 0, "SUM with a range reference adds all values from B2 through B6."),
        question("apps-q2", "Which reference remains fixed when a spreadsheet formula is copied?", ["B2", "$B$2", "B$", "2B"], 1, "The dollar signs make both the column and row absolute."),
        question("apps-q3", "Which slide design choice best supports an audience?", ["Use concise text and readable contrast", "Put a full essay on each slide", "Use a different font on every line", "Use colour as the only way to distinguish critical information"], 0, "Concise content and readable contrast make slides easier to follow."),
      ]),
    ],
  },
  {
    id: "communication",
    number: "05",
    title: "Communication",
    summary: "Communicate clearly in academic, workplace, and digital contexts.",
    topics: [
      topic("written-communication", "Written and workplace communication", "Plan clear messages for a specific reader and purpose.", ["Effective communication considers purpose, audience, channel, tone, and the action or response needed.", "Professional emails use a relevant subject, courteous greeting, concise paragraphs, clear request, and appropriate sign-off.", "Proofread names, dates, attachments, grammar, and confidentiality before sending."], [
        question("comm-q1", "What should a useful professional email subject line do?", ["Summarise the topic or required action", "Replace the message body", "Include private credentials", "Be left blank"], 0, "A clear subject helps the recipient understand and prioritise the message."),
        question("comm-q2", "Which message is clearest when requesting a document?", ["Send it soon", "Please email the signed form by 3 p.m. on Friday", "You know what I mean", "Do the thing"], 1, "It states the item, action, and deadline clearly."),
        question("comm-q3", "What should you check before sending an email with an attachment?", ["That the correct file is attached and appropriate to share", "That the attachment has an unrelated filename", "That all recipients are added by default", "That the subject field is empty"], 0, "Check the file and recipients to avoid errors and unintended disclosure."),
      ]),
      topic("oral-and-digital", "Oral, non-verbal, and digital communication", "Select communication channels and present information accessibly.", ["Active listening includes attention, clarification, and accurate acknowledgement of the speaker's meaning.", "Oral presentations benefit from a clear structure: opening, key points, supporting evidence, and close.", "Digital etiquette includes respectful language, accessible content, careful audience selection, and awareness that messages may be retained or forwarded."], [
        question("oral-q1", "Which action best demonstrates active listening?", ["Interrupting to change the subject", "Summarising the speaker's point and asking a clarifying question", "Looking away and preparing a reply", "Assuming the speaker's meaning"], 1, "Summarising and clarifying checks understanding and shows attention."),
        question("oral-q2", "Which structure is most suitable for a short presentation?", ["Opening, organised key points, and conclusion", "Conclusion only", "Unrelated points in random order", "Read every slide word for word"], 0, "A clear structure helps the audience follow the message."),
        question("oral-q3", "Which practice improves accessibility of digital communication?", ["Add meaningful alternative text to informative images", "Use colour alone to convey meaning", "Use tiny text in low contrast", "Share inaccessible scanned pages only"], 0, "Alternative text conveys the purpose of informative images to people using assistive technology."),
      ]),
    ],
  },
  {
    id: "computational-mathematics",
    number: "06",
    title: "Computational Mathematics",
    summary: "Use number systems, logic, and quantitative methods in computing problems.",
    topics: [
      topic("number-systems", "Number systems and data representation", "Convert between number bases and relate binary to digital data.", ["Digital systems represent values using binary digits 0 and 1. A binary place has a power-of-two weight.", "To convert binary to decimal, add the weights of positions containing 1. For example, 1011₂ = 8 + 2 + 1 = 11₁₀.", "A hexadecimal digit represents four binary bits; hexadecimal is a compact way to write binary values."], [
        question("math-q1", "What is 1010₂ in decimal?", ["8", "10", "12", "14"], 1, "1010₂ = 1×8 + 0×4 + 1×2 + 0×1 = 10."),
        question("math-q2", "What is 13₁₀ in binary?", ["1011₂", "1101₂", "1110₂", "1001₂"], 1, "13 = 8 + 4 + 1, so the binary representation is 1101₂."),
        question("math-q3", "How many binary bits are represented by one hexadecimal digit?", ["2", "4", "8", "16"], 1, "Each hexadecimal digit corresponds to one four-bit binary group."),
      ]),
      topic("logic-and-arithmetic", "Boolean logic and computational arithmetic", "Evaluate simple Boolean expressions and apply arithmetic accurately.", ["Boolean values are true or false. AND is true only when both inputs are true; OR is true when at least one input is true; NOT reverses a value.", "Use operator precedence and parentheses to make expressions unambiguous.", "Check arithmetic results with estimation, units, and a second method where appropriate."], [
        question("logic-q1", "If A is true and B is false, what is A AND B?", ["True", "False", "Undefined", "Both true and false"], 1, "AND is true only if both operands are true."),
        question("logic-q2", "If A is false and B is false, what is A OR B?", ["True", "False", "Undefined", "A"], 1, "OR is true when at least one operand is true; neither is true here."),
        question("logic-q3", "What is NOT true?", ["True", "False", "Zero only", "Undefined"], 1, "NOT reverses a Boolean value, so NOT true is false."),
      ]),
    ],
  },
  {
    id: "structured-programming",
    number: "07",
    title: "Structured Programming",
    summary: "Design and test programs using sequence, selection, iteration, and modularity.",
    topics: [
      topic("algorithms-and-control", "Algorithms and control structures", "Trace algorithms and use sequence, selection, and iteration.", ["An algorithm is a finite, ordered set of steps for solving a problem. Pseudocode and flowcharts help express an algorithm before coding.", "Sequence runs statements in order; selection chooses a path based on a condition; iteration repeats a block.", "Trace tables record variable values and conditions step by step to find logic errors."], [
        question("prog-q1", "Which control structure repeats a block while a condition remains true?", ["Sequence", "Selection", "Iteration", "Declaration"], 2, "Iteration repeats statements according to a loop condition."),
        question("prog-q2", "What does an IF statement provide?", ["Selection", "Permanent storage", "Input validation by itself", "A network connection"], 0, "IF selects a path based on whether a condition is true or false."),
        question("prog-q3", "What is the purpose of a trace table?", ["Follow variable values through an algorithm", "Compile source code", "Format a report", "Encrypt a file"], 0, "A trace table records how variables and conditions change while an algorithm runs."),
      ]),
      topic("program-design-and-testing", "Program design, modularity, and testing", "Break a problem into modules and test expected and boundary behaviour.", ["Decomposition breaks a complex problem into smaller manageable tasks; modules can then be designed and tested separately.", "Meaningful identifiers, indentation, and comments where needed improve readability and maintenance.", "Test normal, boundary, and invalid inputs. Compare actual output with expected output and correct errors systematically."], [
        question("design-q1", "Why decompose a programming problem into modules?", ["To make each part easier to design, test, and maintain", "To prevent all reuse", "To make the program impossible to read", "To avoid defining inputs"], 0, "Smaller modules isolate responsibilities and simplify development and testing."),
        question("design-q2", "Which input is the lower valid boundary for a field that accepts whole numbers from 1 to 100 inclusive?", ["50", "0", "101", "1"], 3, "The range includes 1, so 1 is its lower valid boundary. Values 0 and 101 are just outside the allowed range."),
        question("design-q3", "A test case should normally include:", ["Input, expected result, and observed result", "Only the programmer's name", "The source code font", "A random file path"], 0, "Expected and observed results can be compared to determine whether behaviour is correct."),
      ]),
    ],
  },
];

export const practicalSteps = [
  "Create a clearly named folder for a class project.",
  "Create a document with a title, heading and short paragraph.",
  "Build a spreadsheet with three items and a formula for the total.",
  "Save both files in the project folder using descriptive filenames.",
  "Review sharing and privacy settings before sending the work.",
];

export function getUnitQuestions(unit) {
  return unit.topics.flatMap((unitTopic) => unitTopic.questions.map((item) => ({
    ...item,
    unitId: unit.id,
    topicId: unitTopic.id,
    topicTitle: unitTopic.title,
  })));
}
