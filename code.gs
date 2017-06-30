
function onOpen() {
  // Add Menu Item in Spreadsheet
  SpreadsheetApp.getUi().createMenu("File List")
  .addItem("File List in current folder", "listFiles")
  .addToUi()
}

function listFiles() {
  var ss = SpreadsheetApp.getActive();

  // In which folder is this file?
  var ssId = ss.getId();
  var thisfile = DriveApp.getFileById(ssId);
  var fold = thisfile.getParents();
  if (fold.hasNext())
    var folder = fold.next();

  // Initialize the sheet
  var sheet = ss.getActiveSheet();
  sheet.clear()
  
  // Insert Header
  sheet.appendRow(["FileName","FileID", "DownloadUrl", "Size", "Url", "DateCreated", "LastUpdated", "Owner"]);

  // Populate the sheet with Names, Id, end other attributes
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    sheet.appendRow([
      file.getName(),
      file.getId(),
      file.getDownloadUrl(),
      file.getSize(),
      file.getUrl(),
      file.getDateCreated(),
      file.getLastUpdated(),
      file.getOwner()
    ]);
  }
}
