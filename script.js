function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(div => div.style.display = 'none');
  const active = document.getElementById(tab + 'Tab');
  if (active) active.style.display = 'block';
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

function insertSnippet(value, targetId) {
  const snippets = {
    // AMPscript
    ampscript_var_set: '%%[ SET @name = "John" ]%%',
    ampscript_if_else: '%%[ IF @age > 18 THEN SET @msg = "Adult" ELSE SET @msg = "Minor" ENDIF ]%%',
    ampscript_lookup: '%%[ SET @val = Lookup("MyDE", "Email", "SubscriberKey", @key) ]%%',
    ampscript_lookupRows: '%%[ SET @rows = LookupRows("Orders", "CustomerId", @cid) ]%%',
    ampscript_now_formatDate: '%%[ SET @now = Now() SET @formatted = FormatDate(@now, "yyyy-MM-dd") ]%%',
    ampscript_empty_length: '%%[ IF Empty(@email) THEN SET @msg = "Missing" ENDIF ]%%',
    ampscript_concat_upper: '%%[ SET @full = Concat("Hi ", ProperCase(@name)) ]%%',

    // SSJS
    ssjs_load_core: '<script runat="server"> Platform.Load("Core", "1.1.1"); </script>',
    ssjs_write: '<script runat="server"> Write("Hello from SSJS!"); </script>',
    ssjs_try_catch: '<script runat="server"> try { Write("Try block"); } catch(e) { Write(e); } </script>',
    ssjs_lookup: '<script runat="server"> var val = Lookup("MyDE", "Email", "ID", 123); </script>',
    ssjs_lookupRows: '<script runat="server"> var rows = LookupRows("Orders", "Status", "Shipped"); </script>',
    ssjs_de_init: '<script runat="server"> var de = DataExtension.Init("MyDE"); </script>',
    ssjs_json: '<script runat="server"> var json = Platform.Function.ParseJSON(\'{"name":"John"}\'); </script>',

    // SQL
    sql_select_top: 'SELECT TOP 10 * FROM Contacts',
    sql_join: 'SELECT a.Email, b.OrderID FROM Contacts a JOIN Orders b ON a.ID = b.ContactID',
    sql_case_when: 'SELECT CASE WHEN Age >= 18 THEN "Adult" ELSE "Minor" END AS Category FROM Contacts',
    sql_datepart: 'SELECT DATEPART(year, CreatedDate) AS Year FROM Orders',
    sql_coalesce: 'SELECT COALESCE(FirstName, "Unknown") FROM Contacts',
    sql_isnull: 'SELECT ISNULL(City, "N/A") FROM Addresses',
    sql_cast_convert: 'SELECT CAST(Birthdate AS DATE) FROM Contacts',
    sql_where_like: "SELECT * FROM Contacts WHERE Email LIKE '%@gmail.com%'"
  };

  const textarea = document.getElementById(targetId);
  if (snippets[value] && textarea) {
    textarea.value = snippets[value];
  }
}

function run(type) {
  const input = document.getElementById(type + "Code");
  const log = document.getElementById(type + "Log");
  const out = document.getElementById(type + "Out");

  if (!input || !log || !out) return;

  const code = input.value.trim();
  let output = "";
  let debug = "";

  try {
    if (!code) throw new Error("Code is empty");

    switch (type) {
      case "ampscript":
        if (!code.includes("%%")) throw new Error("Missing AMPscript delimiters (%%[ ... ]%%)");
        debug = "✅ AMPscript syntax looks good";
        output = "// Simulated AMPscript Output\n" + code;
        break;
      case "ssjs":
        if (!code.includes("script runat=\"server\"")) throw new Error("Missing SSJS <script runat=\"server\"> tag");
        debug = "✅ SSJS syntax OK";
        output = "// Simulated SSJS Output\n" + code;
        break;
      case "sql":
        if (!code.toLowerCase().includes("select")) throw new Error("SQL must contain SELECT");
        debug = "✅ SQL looks valid";
        output = "-- Simulated SQL Output\n" + code;
        break;
      case "json":
        const parsed = JSON.parse(code);
        output = JSON.stringify(parsed, null, 2);
        debug = "✅ Valid JSON";
        break;
      default:
        throw new Error("Unknown code type");
    }
  } catch (e) {
    output = "// ❌ Error\n" + e.message;
    debug = "❌ " + e.message;
  }

  out.innerText = output;
  log.innerText = debug;
}
