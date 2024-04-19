using Relations;

namespace Events;

public class Event: ICanvasObject {
    public int eventId {get; private set;}
    public string? eventLabel {get; private set;}
    public (int, int) position {get; private set;}
    public (int, int) size {get; private set;}

    public bool isIncluded {get; private set;}
    public bool isEnabled {get; private set;}
    public bool isPending {get; private set;}
    public bool isExecuted {get; private set;}
    public List<IRelation> inRelations {get; set;}
    public List<IRelation> outRelations {get; set;}
    public int depth {get; set;}
    public Event(int id, int x, int y, int width, int height, string? label) {
        eventId = id;
        eventLabel = label;
        position = (x, y);
        size = (width, height);
        inRelations = new List<IRelation>();
        outRelations = new List<IRelation>();
        depth = 0;
    }
    
    public void Render(){
        return;
    }
}